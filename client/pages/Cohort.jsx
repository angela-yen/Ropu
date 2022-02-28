import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Stack } from '@chakra-ui/react'
import Post from '../components/posts/postItem'

export default function Cohort() {
  const param = useParams()
  const [data, setData] = useState()

  useEffect(() => {
    console.log(param)
    console.log(data)
  }, [data])

  useEffect(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_cohort', param.id)

    setData(data)
  }, [])

  return (
    <Stack spacing='6'>
      {data?.map((post, index) => {
        return <Post key={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} author='Ryan' authorCohort='Harakeke' type='link' postCreated={post.created_at} commentsNum={post.no_comments} />
      })
      }
    </Stack>
  )
}