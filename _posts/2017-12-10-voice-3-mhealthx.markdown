---
title: mhealthx software pipeline
subtitle: for feature analysis
layout: project
modal-id: mhealthx
categories: [project, voice, software]
tags: features
date: 2017-12-01
img: mhealthx.jpg
thumbnail: mhealthx-thumbnail.jpg
alt: "mhealthx"
description:  If you collect voice data and want to analyze it, this open source software wraps over different packages for mobile health feature analysis.  For voice feature extraction, we currently make most use of the openSMILE package, but have plans to expand the pipeline to include more packages.
permalink: /mhealthx.html
people: [arno-klein, jon-clucas]
glyph: voice.png
github:
    mhealthx:
        name: mhealthx
        url: https://github.com/ChildMindInstitute/mhealthx
---
## Prior work

We have experience extracting and analyzing features from different biomedical data, and have recently emphasized voice analysis in our research:

  - We used mobile sensors, feature extraction, and prediction models to enable a scalable approach for estimating individual variation in depression and Parkinson’s disease [[1]](https://dx.doi.org/10.1121/1.4950530).
  - We helped to develop the mPower smartphone app on top of Apple’s ResearchKit [[2]](https://dx.doi.org/10.1038/sdata.2016.11), which includes voice analysis in its tracking of cognitive, behavioral, mood, and physiological states in thousands of people with Parkinson’s disease [[3]](https://dx.doi.org/10.1142/9789814749411_0026).
  - We have used a portable audio recorder to track and quantify progress of children with selective mutism enrolled in a week-long intensive group behavioral treatment program designed by the Child Mind Institute [4].
  - We are preparing two manuscripts for publication demonstrating the use of voice recordings to differentiate between people with and without selective mutism under different experimental conditions.

## Aims

  1. Extend our open source software pipeline to analyze voice and speech data.
  2. Apply our analysis methods to predict neuropsychiatric diagnoses and symptom severity in the world’s largest open, transdiagnostic, multimodal, pediatric study population (target N=10,000).
  3. Extend our prediction algorithms to include multimodal data (e.g., behavioral and physiological measures, brain imaging, eye tracking data) for richer digital phenotyping.
  4. Create a linked database to relate voice biomarkers with diagnostic information.
    
## Significance
Extraction and analysis of high-dimensional feature sets to characterize vocal production,
speech patterns, and speech content is a promising direction for biomarker identification.
Features characterizing vocal production are independent of speech content itself, and can
provide objective measures of motor difficulties as well as objective means of assessing
psychiatrically relevant states, such as mood and anxiety. Features related to speech patterns
and content provide additional opportunities to characterize more complex emotional and
cognitive states, as well as issues related to processing information and expressing thoughts.
We will apply our analyses to voice data from thousands of children who have participated
in a thorough battery of clinical assessments. By making these data, software, and results
openly available, we will establish new normative standards for voice-based diagnosis,
prediction of risk, and monitoring of symptom severity for a broad range of neuropsychiatric
conditions. By relating these voice-derived features to ancillary data from brain imaging and
other modalities, we will provide a richer context for the contribution of voice data to
diagnosis and prediction.

## Research plan

As part of the [Healthy Brain Network project](http://healthybrainnetwork.org),
we are collecting structural and functional MR brain images, EEG, eye tracking data,
and hours of interviews and mental health assessments from 10,000 children and adolescents
(current n=1,200). We have recently added voice recording and will soon include actigraphy
and physiological measures: Voice_recording: We collect audio recordings during all tests
and interviews with a portable Sony ICD-UX 533 digital voice recorder. After participants
watch a 4-minute emotional animated film called “The Present” in the MRI scanner,
they narrate the story in their own words and answer a series of perspective-taking
questions related to the film. During this narration and question answering session we
collect high-definition video and high-fidelity audio recordings with a Røde NT1 cardioid
condenser microphone. Actigraphy: Each participant will wear a wrist-worn ActiGraph wGT3X-BT
to monitor movement throughout the day and night for up to one month. Physiological data:
We are currently evaluating other wearable devices that help to infer internal state,
such as electrodermal activity (stress) and photoplethysmography (heart rate) with
Empatica devices. We will soon have participants wear the device while undertaking all
assessments and interviews.

## References

  - [1] Ghosh, SS, Ciccarelli, G, Quatieri, TF, Klein, A. (2016). Speaking one's mind: Vocal biomarkers of depression and Parkinson disease. *The Journal of the Acoustical Society of America*, *139*(4):2193. [doi:10.1121/1.4950530](https://dx.doi.org/10.1121/1.4950530)
  - [2] Bot, B.M., Suver, C., Neto, E.C., Kellen, M., Klein, A., Bare, C., Trister, A.D. (2016). The mPower Study, Parkinson disease mobile data collected using ResearchKit. *Scientific Data*, *3*(March):160011. [doi:10.1038/sdata.2016.11](https://dx.doi.org/10.1038/sdata.2016.11)
  - [3] Chaibub Neto, E., Bot, B. M., Perumal, T., Omberg, L., Guinney, J., Kellen, M., Trister, A. D. (2016). Personalized hypothesis tests for detecting medication response in Parkinson disease patients using iPhone sensor data. *Proceedings of the Pacific Symposium on Biocomputing*:273–284. [doi:10.1142/9789814749411_0026](https://dx.doi.org/10.1142/9789814749411_0026)
  - [4] Busman, R, Xu, HY, Jozanovic, RK, et al. (2016). Evaluating the efficacy of a targeted behavioral treatment for selective mutism using vocal recording. *SMA-UCLA Annual Conference*.