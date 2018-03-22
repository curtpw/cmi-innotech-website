---
title: My Mind Matters Quiz
subtitle: for mental health profiles
layout: project
modal-id: m3q
categories: [project, informatics, database]
tags: questionnaire
date: 2017-12-01
img: mhdb.jpg
thumbnail: mhdb.jpg
alt: "M3Q"
description:  Much as you can build your own personality profile using an online questionnaire, we are building an adaptive questionnaire to help you build your own mental health profile. To create the world’s most comprehensive yet personalized questionnaire, rather than simply aggregate and recycle existing questions, we are algorithmically generating our questions from “neutralized” (de-stigmatized) versions of psychiatric symptoms that incorporate different dimensions (frequency, duration, intensity, latency, and context), as part of a mental health database (see figure above).
permalink: /m3q.html
people: [anirudh-krishnakumar, arno-klein, jake-son, jon-clucas]
glyph: informatics.png
github:
    mhdb:
        name: mhdb
        url: https://github.com/ChildMindInstitute/mhdb
---

### The need for a better mental health assessment questionnaire
Of the multitude of survey instruments used for assessing mental health conditions, most are proprietary, expensive,
redundant, onerous, diagnosis-centric, in paper form and static in the set of questions and in their scoring, based
on dated data sets derived from small populations. These surveys are usually filled out in a clinic, which by itself
means that the vast majority of people do not have access to them or to any insights derived from filling them out.
Why can’t mental health assessment be engaging, dynamic, informative, and more inclusive, like online tools for
building a personality profile?

To address this problem, we propose to build a mental health assessment framework called “My Mind Matters Quest” (M3Q)
that anyone will be able to use to build a personalized mental health profile through a web browser or a smartphone app.
The M3Q will be free, open source, online, adaptive, and engaging enough to entice users to come back and learn more
about themselves and about other people. The Child Mind Institute (CMI) has experience creating questionnaires and
administering them to, for example, 10,000 children as part of CMI’s ongoing Healthy Brain Network (HBN) study.
The M3Q’s database currently includes symptoms and diagnostic categories from psychiatric statistical manuals such as
the DSM-V, thousands of questions from over 80 mental health questionnaires, and information about mental health
resources. We will use this database to test whether generating questions from symptoms in a principled bottom-up
manner will lead to more informative and helpful answers, as per these Aims:

### Algorithmically derived mental health questions and crowdsourcing their evaluation.
Most mental health questionnaires contain ambiguous questions pertaining to a limited set of symptoms.
Moreover, these questions are often too extreme to allow for gradations in response from the population at large.
To generate a more rigorous and inclusive set of questions, we will: (1) articulate a neutralized version of all
symptoms (e.g., “failure to understand tasks or instructions” becomes “understanding of instructions”),
(2) automatically apply different dimensions (frequency, duration, latency, intensity, context) to each of the
symptoms as appropriate to create a set of questions (e.g., “How often do you…” vs. “How long does it take for you to…”
“…understand instructions?”), and (3) reach out to CMI’s network of clinicians, psychologists, schools, etc. to
crowdsource expert evaluation of our resulting set of questions.

### Testing clinical efficacy of mental health questions and evaluating data-driven diagnoses.
We will evaluate the usefulness of existing questionnaires’ questions, and our derived questions, based on how well
they predict diagnoses, by administering both sets of questions to thousands of diagnosed HBN participants.
We will test the degree to which these predictions are governed by individual questions or by high-order interactions
among many questions. Based on this, we will see how well diagnoses defined by similar patterns of answers (using
either existing or automatically generated questions) match HBN clinicians’ diagnoses. Collecting questionnaire
responses from thousands of diagnosed HBN participants confers the added benefit of establishing new normative
standards to reflect the great diversity of mental health conditions. As more such data are added, these norms
will dynamically update for use as benchmarks for diagnosis, assessment and prediction about conversion and recovery.

### Building an online “build-your-own mental health profile” game-like interface (M3Q).
We will establish a framework for easy, intuitive and efficient navigation of the questionnaire. To determine an
efficient, personalized path through the many possible questions, we will model the question space as an energy
landscape that is searched algorithmically, as is standardly done for optimization problems in computer science.
This landscape can encode the distribution of high- to low-predictor questions to help optimize efficient traversal
and coverage of the mental health space. The user will be encouraged to complete their profile by invoking game
mechanics that entice and reward the user to continue, such as simple feedback regarding progress, through rewards
and app notifications.

The above may constitute the first framework to not only generate mental health assessment questions, but also
to crowdsource their evaluation. Creating an empirically-driven, dynamically updated assessment instrument was the
original intent of the DSM-V, and this project would realize that goal, to the benefit of all mental health stakeholders.
