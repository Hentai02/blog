'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
// import { useTheme } from 'next-themes'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) {
    return null
  }

  // if(siteMetadata.comments.giscusConfig?.theme){
  //   // 动态切换 Giscus 主题
  //   const { theme, resolvedTheme } = useTheme()
  //   siteMetadata.comments.giscusConfig.theme = theme === 'system' ? resolvedTheme : theme
  // }

  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
    </>
  )
}
