export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_STUDIO_API_VERSION ||
  '2025-09-17'

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: SANITY_STUDIO_DATASET (for Studio) or NEXT_PUBLIC_SANITY_DATASET (for Next.js)'
)

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID (for Studio) or NEXT_PUBLIC_SANITY_PROJECT_ID (for Next.js)'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
