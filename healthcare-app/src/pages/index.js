import Head from 'next/head'
import Container from '@mui/material/Container';
import HomeToolbar from '../components/toolbar'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
];

export default function HomePage() {
  // const router = 

  // useEffect(() => {

  // }, [])

  return (
    <div>
      <HomeToolbar color='primary' />
      <Container>

      </Container>
    </div>
  );
}