interface ArticleBodyProps {
  html: string
}

export default function ArticleBody({ html }: ArticleBodyProps) {
  return (
    <div
      className="article-body font-serif text-ghiaccio leading-[1.85] text-[17px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
