import { useMemo } from "react";

export default function useHeadings(content) {
  const headings = useMemo(() => {
    if (!content) return []
    const regex = /<h2\b[^>]*>(.*?)<\/h2>/gi
    const matches = content.match(regex)
    return matches
  }, [content])

  return headings
}