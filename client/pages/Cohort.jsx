import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Stack, Center, Spinner, Heading, List, ListItem } from '@chakra-ui/react'
import Post from '../components/posts/postItem'

export default function Cohort () {
  const param = useParams()
  const [data, setData] = useState()
  const [cohort, setCohort] = useState()

  useEffect(() => {
    console.log(param)
    console.log(data)
  }, [data])

  useEffect(async () => {
    const { data: cohort, error } = await supabase
      .from('users')
      .select()
      .eq('cohort_id', param.id)
    setCohort(cohort)
  }, [])

  useEffect(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_cohort', param.id)
    setData(data)
  }, [])

  if (!data) {
    return (
      <Center height='100vh'>
        <Spinner onl
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='orange.500'
          size='xl'
        />
      </Center>)
  } else {
    return (
      <Stack spacing='6'>
        {data?.map((post, index) => {
          return <Post key={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} author='Ryan' authorCohort='Harakeke' type='link' postCreated={post.created_at} commentsNum={post.no_comments} id={post.id} />
        })
        }
        <Heading> Cohort Members: </Heading>
        {cohort?.map((name) => {
          return <List> <ListItem>{name.user_name}</ListItem> </List>
        }
        )}
      </Stack>
    )
  }
}
