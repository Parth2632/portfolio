import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  nitro: {
    // Bundle these packages instead of externalizing - fixes Bun module resolution
    externals: {
      inline: ['ofetch', 'ipx', 'defu', 'ufo']
    }
  },
  typescript: {
    typeCheck: false, // Disable during build - causes Docker hangs with Bun
  },
  // Load icons from CDN instead of bundling 21MB locally
  icon: {
    serverBundle: 'remote',
  },

  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-security'
  ],

  vite: {
    plugins: [tailwindcss()],
    // Workaround for @nuxt/content HMR race condition:
    // Vite watcher sees database.compressed.mjs being written and triggers HMR
    // before the file write completes, causing "Database integrity check failed"
    server: {
      watch: {
        ignored: ['**/.nuxt/content/database.compressed.mjs', '**/.nuxt/content/sql_dump.txt']
      }
    }
  },

  css: ['@/assets/css/tailwind.css'],

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  colorMode: {
    classPrefix: '',
    classSuffix: '',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      script: []
    }
  },
  content: {
    // Let @nuxt/content auto-detect SQLite provider (uses bun:sqlite on Bun runtime)
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['python', 'bash', 'json', 'xml'],
        },
        remarkPlugins: {
          'remark-smartypants': {}
        }
      }
    }
  },
  site: {
    url: 'https://partharora.dev',
    description: 'Full Stack Developer specializing in AI, backend systems, and modern web experiences.',
    title: 'Parth Arora - Full Stack Developer',
    name: 'Parth Arora - Full Stack Developer',
  },
  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Parth Arora',
      description: 'Full Stack Developer specializing in AI, backend systems, and modern web experiences.',
      url: 'https://partharora.dev',
      jobTitle: 'Full Stack Developer',
      sameAs: [
        'https://github.com/Parth2632',
        'https://www.linkedin.com/in/parth-arora-4a9636325',
      ],
      knowsAbout: [
        'AI Development',
        'Backend Engineering',
        'Nuxt.js',
        'Python',
        'Web Applications'
      ]
    }
  },

  // Security configuration with CSP and SRI disabled
  // SRI is incompatible with external scripts (Cloudflare, Umami) that change independently
  security: {
    sri: false,
    headers: {
      contentSecurityPolicy: false
    },
    rateLimiter: false // Disable rate limiting in dev (annoying for hot-reload)
  },

  routeRules: {
    '/resume.pdf': {
      headers: {
        'Content-Disposition': 'attachment; filename="Resume.pdf"'
      }
    }
  }
});
