'use client'

import { Button, Heading, Img } from '@chakra-ui/react';
import error from '../../favicon.ico'

export default function ErrorBoundary({error, reset}:{error:Error, reset:()=>void}){
    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          {/* <Img src={error} /> */}
          <Heading size={'md'} color={'red'}>{error.message}</Heading>
          <Button onClick={reset}>Try again</Button>
        </div>
      );
}