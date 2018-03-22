/**
 * @function show_hide_div_button - Function to show/hide instructions
 * @param {string} sh_div - id of container div
 * @param {string} sh_btn - id of button to show/hide div id=sh_div
 * @param {string} show_text - text to show on "show" button id=sh_btn when div id=sh_div is hidden
 * @param {string} hide_text - text to show on "hide" button id=sh_btn when div id=sh_div is displayed
 */
function show_hide_div_button(sh_div, sh_btn, show_text, hide_text){
  var div = document.getElementById(sh_div);
  var btn = document.getElementById(sh_btn);
    if (div.style.display === "none") {
        div.style.display = "block";
        btn.innerHTML = hide_text;
    } else {
        div.style.display = "none";
        btn.innerHTML = show_text;
    }
}


/**
 * @global @var {Object} question_types - Object to translate from human-readable template keys to db-readable backend keys
 * @global @var {string} Object.keys[](question_types) - question type as displayed in the template
 * @global @var {string} Object.values[](question_types) - question type as encoded in the app's backend JSON.
 */
var question_types = {
  "Single Choice": "single_sel",
  "Choice": "single_sel",
  "Image": "image_sel",
  "Multiple Choice": "multi_sel",
  "Multiple": "multi_sel",
  "Text Entry": "text",
  "Text": "text"
};


/**
 * @callback questionnaire_exists - Callback function to test on each value in Array to check for an existing questionnaire.
 * @see Array.prototype.find()
 * @this {string} - questionnaire name to look for in Array
 * @param {Object} questionnaire_in_array - Object in Array of questionnaire Objects
 * @param {string} questionnaire_in_array.title - name of questionnaire already in Array
 * @returns {Object} - Object iff this matches the .title of a questionnaire in Array, else undefined
 */
function questionnaire_exists(questionnaire_in_array){
  return(this == questionnaire_in_array["title"]);
}


/**
 * @function questions_responses - Function to generate JSON for a question with responses iff responses are provided.
 * @param {Boolean} test - Are responses provided?
 * @param {string} [question_group_instruction] - Repeated question instruction
 * @param {string} question_title - Individual question instruction
 * @param {Object} question_types - Object to translate from human-readable template keys to db-readable backend keys
 * @param {string} Object.keys[](question_types) - question type as displayed in the template
 * @param {string} Object.values[](question_types) - question type as encoded in the app's backend JSON.
 * @param {Object} file_json_array_i - Object from parsed Mindlogger template CSV
 * @param {string} (file_json_array_i["Question ID"]|file_json_array_i["Variable Name"]) - question ID or variable name for individual question
 * @param {string} (file_json_array_i["Response Type"]|file_json_array_i["Activity Type"]) - response type for individual question
 * @param {Object} response_json[] - Array of Objects containing response options and values for this individual question
 * @returns {Object} - Object containing one question, its instruction(s), response type and all of its response options
 */
function questions_responses(test, question_group_instruction, question_title, question_types, file_json_array_i, response_json){
  var variable_name = file_json_array_i.hasOwnProperty("Question ID") ? file_json_array_i["Question ID"].trim() : file_json_array_i["Variable Name"].trim();
  var response_type = file_json_array_i.hasOwnProperty("Response Type") ? file_json_array_i["Response Type"].trim() : file_json_array_i["Activity Type"].trim();
  if (question_group_instruction.length){
    var question_individual = question_title;
    question_title = question_group_instruction + ": " + question_title;
    if(variable_name.length){
      return(
        test ? {
          "title": question_title,
          "group_instruction": question_group_instruction,
          "individual_instruction": question_individual,
          "type": question_types[response_type],
          "rows": response_json,
          "variable_name": variable_name,
        } : {
          "title": question_title,
          "group_instruction": question_group_instruction,
          "individual_instruction": question_individual,
          "type": question_types[response_type],
          "variable_name": variable_name,
        }
      )
    } else {
        return(
        test ? {
          "title": question_title,
          "group_instruction": question_group_instruction,
          "individual_instruction": question_individual,
          "type": question_types[response_type],
          "rows": response_json,
        } : {
          "title": question_title,
          "group_instruction": question_group_instruction,
          "individual_instruction": question_individual,
          "type": question_types[response_type],
        }
      );
    }
  } else {
    if(variable_name.length) {
      return(
        test ? {
          "title": question_title,
          "type": question_types[response_type],
          "rows": response_json,
          "variable_name": variable_name,
        } : {
          "title": question_title,
          "type": question_types[response_type],
          "variable_name": variable_name,
        }
      );
    } else {
      return(
        test ? {
          "title": question_title,
          "type": question_types[response_type],
          "rows": response_json,
        } : {
          "title": question_title,
          "type": question_types[response_type],
        }
      );
    }
  }
}


/**
 * @function split_by_delimiters - Split by delimiters stopping after successful split
 * @param {string} responses - delimited string containing response options for a question
 * @param {string[]} delimiters - Array of preferentially ordered delimiters to separate response options from responses
 * @returns {string[]} - Array of response options in the format "value=option"
 */
function split_by_delimiters(responses, delimiters){
  var out = responses.split(delimiters.shift());
  return(out.length > 1 ? out : delimiters.length ? split_by_delimiters(responses, delimiters) : responses);
}


/**
 * @function json_restructure - Function to restructure results of Papaparse into specific JSON format.
 * @param {Object[]} file_json_array - output array from Papaparse
 * @returns {Object[]} Array Mindlogger formatted questionnaire Objects
 */
function json_restructure(file_json_array) {
  var dbs_json = [];
  for (var i=0; i<file_json_array.length; i++){
    var questionnaire_name = file_json_array[i].hasOwnProperty("Questionnaire Name") ? file_json_array[i]["Questionnaire Name"].trim() : file_json_array[i]["Questionnaire"].trim();
    var questionnaire_id = file_json_array[i].hasOwnProperty("Questionnaire ID") ? file_json_array[i]["Questionnaire ID"].trim() : file_json_array[i]["Questionnaire Sort Name"].trim();
    var questionnaire_title = questionnaire_name == questionnaire_id ? questionnaire_name : questionnaire_id + " (" + questionnaire_name + ")";
    var responses = [];
    var response_type = file_json_array[i].hasOwnProperty("Response Type") ? file_json_array[i]["Response Type"].trim() : file_json_array[i]["Activity Type"].trim();
    if (response_type != "Text Entry" && response_type != "Text"){
      var response_options = file_json_array[i].hasOwnProperty("Response Options") ? file_json_array[i]["Response Options"] : file_json_array[i]["Value Labels"];
      responses = split_by_delimiters(response_options, ["\n", "|||", ","]);
      console.log(responses);
      var response_json = [];
      for (var j=0; j<responses.length; j++){
        var response_value = responses[j].split("=");
        response_json.push(
          {
            "text": response_value.length > 1 ? response_value[1].trim() : " ",
            "value": response_value[0].trim(),
          }
        )
      }
    };
    var question_group_instruction = file_json_array[i]["Question Group Instruction"].trim();
    var question_title = file_json_array[i]["Question"].trim();
    var existing_questionnaire = dbs_json.find(questionnaire_exists, questionnaire_title);
    if (existing_questionnaire) {
      existing_questionnaire["questions"].push(questions_responses(responses.length, question_group_instruction, question_title, question_types, file_json_array[i], response_json));
    } else {
      dbs_json.push(
        {
          "activity_type": "survey",
          "mode": "basic",
          "frequency": "1",
          "title": questionnaire_title,
          "questions": [
            questions_responses(responses.length, question_group_instruction, question_title, question_types, file_json_array[i], response_json),
          ],
        }
      );
    };
  };
  return(dbs_json);
}


/**
* @function json_link - Function to create a list item link to download a created JSON object.
* @param {Object} object - Object to download
* @param {string} object.title - name of Object
* @returns {HTMLElement} - li
*/
function json_link(object){
  var li = document.createElement("li");
  var link = document.createElement("a");
  var text = document.createTextNode(object.title);
  link.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object, null, '  ')));
  link.setAttribute("download", encodeURIComponent(object.title.replace(/ /g,'_')) + ".json");
  link.appendChild(text);
  li.appendChild(link);
  return(li);
}

/**
* @function questions_response_preview - Function to preview responses for an encoded questionnaire
* @param {Object} object - Mindlogger formatted response option object
* @param {string} object.text - response option text
* @param {(Number|string)} object.value - value for scoring if response option chosen
* @param {string} response_type - Mindlogger db-format response type
* @param {string} questionnaire_title - name of questionnaire in which this response option is being presented
* @param {Number} question_number - for question order
* @param {Number} response_number - for response option order
* @param {Boolean} last_question_option - iff this is the last response option for the last question in this questionnaire (for CSS)
* @returns {HTMLElement} - Bootstrap row div
*/
function questions_response_preview(object, response_type, questionnaire_title, question_number, response_number, last_question_option){
  var row = document.createElement("div");
  row.setAttribute("class", "row questionnaire_preview_row");
  row.setAttribute("id", "preview_" + questionnaire_title + "qr" + question_number + "." + response_number);
  var left = document.createElement("div");
  left.setAttribute("class", "col-sm-1 col-lg-1");
  var response_option = document.createElement("div");
  var ro_classes = "col-sm-5 col-lg-5 questionnaire_preview";
  if (last_question_option){
    ro_classes += " questionnaire_preview_last";
  }
  response_option.setAttribute("class", ro_classes);
  var response_text = document.createElement("INPUT");
  switch(response_type){
    case "single_sel":
      response_text.setAttribute("type", "radio");
      response_text.setAttribute("value", object.text);
      response_text.setAttribute("id", questionnaire_title + "qr" + question_number + "." + response_number);
      var response_label = document.createElement("label");
      response_label.setAttribute("style", "font-weight:normal;");
      response_label.setAttribute("for", questionnaire_title + "qr" + question_number + "." + response_number);
      response_label.appendChild(document.createTextNode(object.text));
      response_option.appendChild(response_text);
      response_option.appendChild(response_label);
      break;
    case "multi_sel":
      response_text.setAttribute("type", "checkbox");
      response_text.setAttribute("value", object.text);
      response_text.setAttribute("id", questionnaire_title + "qr" + question_number + "." + response_number);
      var response_label = document.createElement("label");
      response_label.setAttribute("style", "font-weight:normal;");
      response_label.setAttribute("for", questionnaire_title + "qr" + question_number + "." + response_number);
      response_label.appendChild(document.createTextNode(object.text));
      response_option.appendChild(response_text);
      response_option.appendChild(response_label);
      break;
    default:
      response_text.setAttribute("type", "text");
      response_text.setAttribute("id", questionnaire_title + "qr" + question_number + "." + response_number);
      response_option.appendChild(response_text);
  }
  response_text.setAttribute("readonly", "True");
  response_text.setAttribute("disabled", "True");
  var right = document.createElement("div");
  right.setAttribute("class", "col-sm-2 col-lg-2");
  right.appendChild(document.createTextNode("(" + object.value + ")"));
  if(response_number == 1){
    switch (response_type) {
      case "single_sel":
        left.appendChild(document.createTextNode("Single Choice"));
        break;
      case "multi_sel":
        left.appendChild(document.createTextNode("Multiple Choice"));
        break;
      default:
      left.appendChild(document.createTextNode("Text Entry"));
    }
  }
  row.appendChild(left);
  row.appendChild(response_option);
  row.appendChild(right);
  console.log(object);
  console.log(row);
  return(row);
}


/**
* @function question_preview - Function to preview questions for an encoded questionnaire
* @param {Object} object - Mindlogger formatted question object
* @param {string} object.title - question text
* @param {string} object.type - Mindlogger db-format response type
* @param {Object[]} [object.rows] - Array of response option Objects
* @param {string} questionnaire_title - name of questionnaire in which this question is being presented
* @param {Number} question_number - for question order
* @param {Boolean} last_question - iff this is the last question in this questionnaire (for CSS)
* @returns {HTMLElement} - Bootstrap container div
*/
function question_preview(object, questionnaire_title, question_number, last_question){
  var container = document.createElement("div");
  var row = document.createElement("div");
  row.setAttribute("class", "row questionnaire_preview_row");
  row.setAttribute("id", "preview_" + question_number + "_" + encodeURIComponent(object.title.replace(/ /g,'_')));
  var left = document.createElement("div");
  left.setAttribute("class", "col-sm-1 col-lg-1");
  var question_text = document.createElement("div");
  var qt_classes = "col-sm-5 col-lg-5 questionnaire_preview";
  var right = document.createElement("div");
  right.setAttribute("class", "col-sm-2 col-lg-2");
  left.appendChild(document.createTextNode(question_number));
  if (question_number == 1){
    qt_classes += " questionnaire_preview_first";
    right.appendChild(document.createTextNode("(response value)"));
  } else {
    var hr = document.createElement("hr");
    hr.setAttribute("style", "margin-top: 0; margin-bottom: 0");
    question_text.appendChild(hr);
    right.appendChild(document.createTextNode(" "));
  }
  question_text.setAttribute("class", qt_classes);
  question_text.appendChild(document.createTextNode(object.title));
  row.appendChild(left);
  row.appendChild(question_text);
  row.appendChild(right);
  container.appendChild(row);
  if (object.type == "text") {
    container.appendChild(questions_response_preview({"value": "free text"}, object.type, questionnaire_title, question_number, 1, last_question));
  } else {
    for (j=0; j < object.rows.length; j++){
      container.appendChild(questions_response_preview(object.rows[j], object.type, questionnaire_title, question_number, j+1, (last_question & j+1==object.rows.length)));
    }
  }
  return(container);
}


/**
 * @function questionnaire_preview - Function to create a questionnaire preview.
 * @param {Object} object - Mindlogger formatted questionnaire Object
 * @param {string} object.title - name of questionnaire
 * @param {Object[]} object.questions - Array of Mindlogger formatted question Objects
 * @returns {HTMLElement} - div
 */
function questionnaire_preview(object){
  var div = document.createElement("div");
  div.setAttribute("id", "preview_" + encodeURIComponent(object.title.replace(/ /g,'_')));
  div.setAttribute("class", "container questionnaire_preview_container");
  var div_title = document.createElement("h3");
  div_title.appendChild(document.createTextNode(object.title));
  div.appendChild(div_title);
  for (i=0; i < object.questions.length; i++) {
    div.appendChild(question_preview(object.questions[i], object.title, i+1, i+1==object.questions.length));
  }
  var button = document.createElement("a");
  button.appendChild(document.createTextNode("If " + object.title + " appears as desired, your CSV is ready to upload"));
  button.setAttribute("href", "http://mindlogger.childmind.org/upload_acts");
  button.setAttribute("class", "btn btn-success");
  button.setAttribute("style", "margin-top:0.5em;")
  var row = document.createElement("div");
  row.setAttribute("class", "row");
  var left = document.createElement("div");
  left.setAttribute("class", "col-sm-1 col-lg-1");
  var center = document.createElement("div");
  center.setAttribute("class", "col-sm-5 col-lg-5");
  var right = document.createElement("div");
  right.setAttribute("class", "col-sm-2 col-lg-2");
  center.appendChild(button);
  row.appendChild(left);
  row.appendChild(center);
  row.appendChild(right);
  div.appendChild(row);
  div.appendChild(document.createElement("hr"));
  return(div);
}


/**
 * @global @var {callback} papa_results - Function to parse CSV
 * @see Papa.parse.config.complete
 * @param {Object} results - Papaparse Parse Results Object @see https://www.papaparse.com/docs#results
 * @param {(Object[]|Array[])} results.data @see https://www.papaparse.com/docs#data
 * @param {Object[]} results.errors @see https://www.papaparse.com/docs#errors
 * @param {Object} results.meta @see https://www.papaparse.com/docs#meta
 * @param {File} file - CSV file
 * @emits Questionnaire#preview - HTML preview of questionnaire(s) within <div id="json_out"/>
 * @emits Questionnaire#json_link - downloadable Mindlogger formatted JSON link(s) within <div id="json_out"/>
 * @returns {Object[]} - Array of Mindlogger formatted questionnaire Objects
 */
var papa_results = function(results, file){
  var object = json_restructure(results.data);
  console.log(object);
  console.log(object.length + " questionnaires extracted from " + file.name);
  var out_area = document.getElementById("json_out");
  out_area.appendChild(document.createElement("hr"));
  var out_container = document.createElement("div");
  out_container.setAttribute("class", "container");
  out_container.setAttribute("id", "questionnaire_preview");
  out_area.appendChild(out_container);
  var out_list = document.createElement("ul");
  out_list.setAttribute("style", "list-style:none;");
  out_area.appendChild(out_list);
  for (var i=0; i < object.length; i++){
    out_container.appendChild(questionnaire_preview(object[i]));
    out_list.appendChild(json_link(object[i]));
  }
  var file_link = document.createElement("a");
  file_link.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object, null, '  ')));
  var object_name = file.name.replace(/.csv/g,'_csv') + ".json";
  var bold = document.createElement("b");
  file_link.setAttribute("download", encodeURIComponent(object_name));
  file_link.appendChild(document.createTextNode(object_name));
  bold.appendChild(file_link);
  var li = document.createElement("li");
  li.appendChild(bold);
  out_list.appendChild(li);
  return(object);
}


/**
 * @global @var {string} re - regular expression to look for file extensions
 */
var re = /(?:\.([^.]+))?$/;


/**
 * @global @var {HTMLElement} control - selector to get file(s)
 */
var control = document.getElementById("your-files-selector");


/**
 * @extends control
 * @param {string} type="change"
 * @param {function(event)}
 * @listens control~change
 * @desc Checks file extension(s), parses CSV(s), previews questionnaire(s) in HTML and offers link(s) to download JSON
 * When the control has changed, there are new files
 * @ control~change
 */
control.addEventListener("change", function(event) {
  /**
   * @var {Number} i - counter
   * @var {File[]} files - Array of Files (from control selector)
   * @var {Number} len - number of Files
   */
  var i = 0,
      files = control.files,
      len = files.length;

  for (; i < len; i++){
    /** @var {File} file - ith File */
    var file = files[i];
    /** @var {string} ext - best guess at File extension, from regular expression @see re */
    var ext = re.exec(file.name)[1];
    console.log("Ext: " + ext);
    if(ext !== "csv"){
      alert("Please upload a CSV worksheet based on our template, not a " + ext + " file.");
    } else {
      /**
       * @function Papa.parse @see https://www.papaparse.com/docs#local-files
       * @param {File} file
       * @param {Object} config @see https://www.papaparse.com/docs#config
       */
      Papa.parse(file, {
      	complete: papa_results,
        header: true,
        skipEmptyLines: true,
      });
    }
  }

}, false);
