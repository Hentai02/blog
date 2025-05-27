'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { useTheme } from 'next-themes'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) {
    return null
  }

  // if(siteMetadata.comments.giscusConfig?.theme){
  //   // 动态切换 Giscus 主题
  //   const { theme, resolvedTheme } = useTheme()
  //   // console.log(`theme: ${theme}`)
  //   // console.log(`resolvedTheme: ${resolvedTheme}`)
  //   siteMetadata.comments.giscusConfig.theme = theme === 'system' ? resolvedTheme : theme
  // }

  const { theme, resolvedTheme } = useTheme()
  let commentsConfigWithDarkTheme = siteMetadata.comments;

  if (siteMetadata.comments.provider === "giscus" && siteMetadata.comments.giscusConfig) {
    commentsConfigWithDarkTheme = {
      ...siteMetadata.comments,
      giscusConfig: {
        ...siteMetadata.comments.giscusConfig,
        theme: resolvedTheme === 'dark'
          ? siteMetadata.comments.giscusConfig.darkTheme
          : siteMetadata.comments.giscusConfig.theme
      },
    };
  }

  


  return (
    <>
      {loadComments ? (
        // <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
        <CommentsComponent commentsConfig={commentsConfigWithDarkTheme} slug={slug} />
      ) : (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
    </>
  )
}
