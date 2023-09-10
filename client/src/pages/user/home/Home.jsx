import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { videoInstance } from '../../../utils/axios'
import { useSelector } from 'react-redux'
import Card from '../../../components/user/card/Card'


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Start with 1 column for small screens */
  gap: 20px;
  justify-content: space-between;
  padding: 20px 20px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 687px) {
   align-items: center;
   padding: 20px 20px 20px 0px;
    grid-template-columns: repeat(2, 1fr); /* Use 2 columns for screens >= 768px */
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr); /* Use 3 columns for screens >= 992px */
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr); /* Use 4 columns for screens >= 1200px */
  }
`;


function Home({ type }) {
  const toggle = useSelector((state) => state.auth.toggle)
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    videoInstance.get(`/${type}`)
      .then((res) => {
        setVideoData(res.data);

        console.log(res.data, "response");
      })
      .catch((err) => {
        console.log(err);
      })
  }, [type])

  return (
    <Container style={{ padding: toggle ? ' 20px 20px 20px 140px' : '20px 20px 20px 20px' }} >
      {videoData && videoData.map((video) => {
        return (
          <>
            <Card key={video?._id} video={video} />
          </>
        )
      })}
    </Container>
  )
}

export default Home
