import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { AppHeader } from '../components/header'
import { Map } from '../components/map'

const Home: NextPage = () => {
  return (
    <div>
      <AppHeader/>
      <h1>Hello Zk Dapp</h1>
      <Map/>
    </div>
  )
}

export default Home
