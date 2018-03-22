---
title: Bibliometric analysis
subtitle: of open data literature
layout: project
modal-id: bibliometric-study-2017
categories: [project, informatics, study]
tags: bibliometrics
date: 2017-12-01
img: bibliometric-study-2017.jpg
thumbnail: bibliometric-study-2017-thumbnail.jpg
img-link: http://rawgit.com/ChildMindInstitute/Biblio_Reader/master/biblio_reader/map/map.html
vid: biblio-circles
alt: "map of coauthorship of PubMed publications using FCP/INDI data"
description:  To demonstrate the benefits of open data sharing and open scientific practices generally, we created software as part of a semi-automated strategy for quantifying the use of open data in the scientific literature. <a href="http://rawgit.com/ChildMindInstitute/Biblio_Reader/master/biblio_reader/map/map.html" target="_blank">The interactive figure linked above</a> shows coauthorship of publications using FCP/INDI data indexed by PubMed. These figures are all as of March 22, 2017.
publication: Assessment of the impact of shared data on the scientific literature
publication-url: https://www.biorxiv.org/content/early/2017/09/04/183814
publication-pdf: https://www.biorxiv.org/sites/all/libraries/pdfjs/web/viewer.html?file=/content/biorxiv/early/2017/09/04/183814.full.pdf
permalink: /bibliometric-study-2017.html
people: [mike-milham,  cameron-craddock, michael-fleischmann, jake-son, jon-clucas, helen-xu, bonhwang-koo, anirudh-krishnakumar, bharat-biswal, xavier-castellanos, stan-colcombe, adriana-dimartino, xinian-zuo, arno-klein]
glyph: informatics.png
github:
    Biblio_Reader:
        name: Biblio_Reader
        url: https://github.com/ChildMindInstitute/biblio-reader
---
## Interactive Maps
Below are interactive maps showing the number of authors from each location that had an affiliation listed in a publication that used [FCP/INDI data](http://fcon_1000.projects.nitrc.org/) and was indexed in PubMed as of March 22, 2017.

### FCP/INDI usage PubMed Authorship by Country (as of March 22, 2017)
<div id="biblio_regions_div" class="biblio_map_interactive"></div>

The United States is an extreme outlier on the high end. Below, we look separately at US divided by states and the rest of the world.

### FCP/INDI usage PubMed Authorship by US State and by Country excluding United States (as of March 22, 2017)
<div id="biblio_us_states_div" class="biblio_map_interactive"></div>
<div id="biblio_regions_minus_us_div" class="biblio_map_interactive"></div>

### Publications citing FCP/INDI data (as of March 22, 2017)
<div style="text-align:center;"><iframe src="https://cdn.rawgit.com/ChildMindInstitute/Biblio_Reader/human_readable/bibliography/index.html" width="85%" height="250px" style="padding:1em;overflow:scroll;"></iframe></div>