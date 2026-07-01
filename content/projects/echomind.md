---
slug: echomind
sort: 10
status: completed
title: EchoMind
subtitle: Local AI Video & Meeting Assistant
description: Built a fully local, privacy-first meeting assistant that converts video and audio into semantic meeting insights using a RAG pipeline.
repo: https://github.com/Parth2632/EchoMind
tech: 
  - name: 'Python'
    icon: 'simple-icons:python'
  - name: 'Whisper'
    icon: 'lucide:mic'
  - name: 'LangChain'
    icon: 'simple-icons:langchain'
  - name: 'Llama 3'
    icon: 'simple-icons:meta'
  - name: 'ChromaDB'
    icon: 'lucide:database'
category: web
tags: ['AI', 'RAG', 'Meeting Assistant']
image: /images/projects/project-cover.png
---

# EchoMind -- Local AI Video & Meeting Assistant

- Built a fully local, privacy-first meeting assistant that converts video and audio into semantic meeting insights using a RAG pipeline powered by Whisper, LangChain/LangGraph, and Llama 3 (via Ollama).
- Cut transcription time from 54 minutes to ~2 minutes per 22-minute video by migrating from OpenAI Whisper to faster-whisper (CTranslate2, INT8) with native PyAV audio streaming.
- Designed a semantic RAG layer using HuggingFace embeddings and a ChromaDB vector store with conversational memory for interactive, context-aware Q&A over meeting transcripts.
- Engineered a custom regex-based temporal "time-slicer" to overcome dense-vector retrieval's weakness on chronological queries, reaching a perfect 10/10 on time-based queries while maintaining 87.5% overall semantic accuracy.
