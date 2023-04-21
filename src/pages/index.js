import styled from 'styled-components'
import Layout from '../layout'
import Hero from '@/components/organisms/hero-homepage'

export default function Home() {
  return (
    <Layout>
      <Wrapper>
        <Hero/>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
`