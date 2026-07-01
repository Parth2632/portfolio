---
slug: neurolearn
sort: 20
status: completed
title: NeuroLearn
subtitle: Neuro-Adaptive Gamified Learning Platform for ADHD Students
description: Multi-agent adaptive learning pipeline expanding a math tutor into a full 10-language acquisition platform.
repo: https://github.com/Shuchih-Negi/Neuro-Learn
tech: 
  - name: 'Python'
    icon: 'simple-icons:python'
  - name: 'FastAPI'
    icon: 'simple-icons:fastapi'
  - name: 'LangChain'
    icon: 'simple-icons:langchain'
  - name: 'Vector DB'
    icon: 'lucide:database'
category: web
tags: ['Education', 'AI', 'ADHD', 'Multi-Agent']
image: /images/projects/project-cover.png
---

# NeuroLearn -- Neuro-Adaptive Gamified Learning Platform for ADHD Students

- Designed and built a multi-agent (Reasoning, Question, Story, QA, Hint) adaptive learning pipeline that expanded an existing math tutor into a full 10-language acquisition platform via a parallel `/api/lang/*` namespace, with zero breaking changes to existing endpoints.
- Applied research-backed pedagogy -- Krashen's Comprehensible Input, Swain's Output Hypothesis, and Lyster & Ranta's recast feedback -- to drive real-time difficulty and exercise-type selection.
- Implemented an LSTM-based knowledge-tracing model (with EWMA/Bayesian fallback) and an SM-2 spaced-repetition scheduler to track per-skill mastery and personalize review timing for each learner.
- Built ADHD-aware adaptive logic that adjusts question complexity, instruction length, and reward feedback in real time based on live attention state (Focused, Drifting, Overwhelmed, Impulsive) from eye-tracking signals.
- Integrated the FastAPI backend with a React/JS frontend to deliver gamified, attention-aware feedback and a mastery/progress dashboard.
