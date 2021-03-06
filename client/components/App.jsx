import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Header from './Header'
import Home from '../pages/home'
import Login from '../pages/Login'
import Jobs from '../pages/Jobs'
import Code from '../pages/Code'
import Events from '../pages/Events'
import Top from '../pages/Top'
import Search from '../pages/Search'
import Cohort from '../pages/Cohort'
import Account from '../pages/Account'
import Post from '../pages/Post'

function App () {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <Box>
      <Header session={session} />
      <Box marginTop='20' paddingY='6' paddingX='12'>
        <Routes>
          <Route path='/' element={<Home session={session} />} />
          <Route path="/post/:id" element={<Post session={session}/>} />
          <Route path='/' element={<Home />} />
          <Route path='/search/:query' element={<Search session={session} />} />
          <Route path='/login' element={<Login key={session?.user?.id} session={session} />} />
          <Route path='/top' element={<Top session={session} />} />
          <Route path='/jobs' element={<Jobs session={session} />} />
          <Route path='/code' element={<Code session={session} />} />
          <Route path='/events' element={<Events session={session} />} />
          <Route path='/account' element={<Account session={session} />} />
          <Route path='cohort'>
            <Route path=":id" element={<Cohort session={session} />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  )
}

export default App
