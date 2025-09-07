#!/usr/bin/env node

const { spawn } = require('child_process')
const path = require('path')

// Set memory limits and other flags to prevent bus errors
const nodeOptions = [
  '--max-old-space-size=1024',  // Reduce memory limit
  '--max-semi-space-size=64',   // Reduce semi-space size
]

// Set environment variables
const env = {
  ...process.env,
  NODE_OPTIONS: nodeOptions.join(' '),
  NODE_ENV: 'development',
  NEXT_TELEMETRY_DISABLED: '1',
  FORCE_COLOR: '1'
}

console.log('🚀 Starting Next.js development server with optimized settings...')
console.log('Node options:', nodeOptions.join(' '))

const child = spawn('npx', ['next', 'dev', '--port', '3000'], {
  env,
  stdio: 'inherit',
  cwd: process.cwd()
})

child.on('error', (error) => {
  console.error('❌ Failed to start server:', error.message)
  process.exit(1)
})

child.on('exit', (code, signal) => {
  if (signal) {
    console.log(`Server was killed with signal ${signal}`)
  } else {
    console.log(`Server exited with code ${code}`)
  }
  process.exit(code || 0)
})

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...')
  child.kill('SIGINT')
})

process.on('SIGTERM', () => {
  child.kill('SIGTERM')
})