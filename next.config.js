/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    db: process.env.DB_HOST
  }
}
