interface ArticleBodyProps {
  html: string
}

export default function ArticleBody({ html }: ArticleBodyProps) {
  return (
    <div
      className="article-body font-serif text-[#0a0f24] leading-[1.85] text-[17px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
