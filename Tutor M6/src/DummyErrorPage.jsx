const DummyErrorPage = () => { 
  throw new Response('',{ status: 403 })
}

export default DummyErrorPage