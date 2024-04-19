import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react'
import { useParams } from 'react-router'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ConfirmationNumberTwoToneIcon from '@mui/icons-material/ConfirmationNumberTwoTone';
import ChildCard from '../../../components/shared/ChildCard';

// Right 
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

export default function SingleTicketDetails() {
  const { id } = useParams();

  //.------------------------------------------------------Fetching TicketData----------------------------------------------//
  const { data, error, isValidating, mutate } = useFrappeGetDoc('Issue', id);

  console.log("Data = ", data);

  return (
    <Container sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, gap: 2, width: '100%', p: 2 }}>
      {data && <Left id={data.name} title={data.subject} status={data.status} />}
      {data && <Right status={data.status} departments={data.departments} />}
    </Container>

  )
}

function Left({ id, title, status }) {
  return (
    <ChildCard sx={{ width: '50%' }}>
      <Box p={2}>
        <Typography variant="h4">Ticket Details</Typography>
        <Box>
          <Box p={3}>
            <Box display="flex" alignItems="center">
              <ConfirmationNumberTwoToneIcon sx={{ width: '70px', height: '70px' }} />

              <Box sx={{ ml: 2 }}>
                <Typography variant="h6" mb={0.5}>
                  {id}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={0.5}>
                  {title}
                </Typography>
              </Box>
            </Box>
            <Grid container>
              <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Ticket Name
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                  {title}
                </Typography>
              </Grid>
              <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  {status}
                </Typography>
              </Grid>
              <Grid item lg={12} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Id
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  {id}
                </Typography>
              </Grid>
              <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                  {title}
                </Typography>
              </Grid>
              {/* <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Company
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  {title}
                </Typography>
              </Grid>
              <Grid item lg={12} xs={12} mt={4}>
                <Typography variant="body2" mb={1} color="text.secondary">
                  Notes
                </Typography>
                <Typography variant="subtitle1" mb={0.5}>
                  {title}
                </Typography>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Box>
    </ChildCard>
  )
}

function Right({ status, departments }) {

  //,------------------------------------------------------Fetching comment List----------------------------------------------//
  // const { data, error, isValidating, mutate } = useFrappeGetDocList('Comment', {
  //   fields: ['name', 'content', 'comment_email', 'creation', 'comment_by'],
  //   filters: [['reference_doctype', '=', 'Issue'], ['reference_name', '=', id]],
  //   // limit_start: start,
  //   limit: 10000,
  //   orderBy: {
  //     field: 'creation',
  //     order: 'desc', //asc
  //   },
  // });

  //,--------------------------------------------------------Formating Date-----------------------------------------//
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
  }

  //,--------------------------------------------------------Converting HTML to string-----------------------------------------//
  const messages = (str) => {
    if ((str === null) || (str === ''))
      return '';
    else
      str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }

  let message = "";

  if (departments.length === 0) {
    message = `Ticket status is ${status} and not assigned to any departments`;
  } else if (departments.length === 1) {
    message = `Issue has been assigned to ${departments[0].department} department and status is ${status}`;
  } else if (departments.length > 1) {
    message = `Issue has been re-assigned to ${departments[departments.length - 1].department} department and status is ${status}`;
  }


  return (
    <ChildCard padding={4} width='50%'>
      <Typography variant="h4" sx={{ padding: "20%" }} mb={2}>{message}</Typography>
    </ChildCard>

    // <ChildCard sx={{ width: '50%' }}>
    //   {data?.length !== 0 ? <Timeline
    //     sx={{
    //       [`& .${timelineOppositeContentClasses.root}`]: {
    //         flex: 0.2,
    //       },
    //     }}
    //   >
    //     <Box p={2}>
    //       <Typography variant="h4" sx={{ mt: "-1.3rem" }}  mb={2}>Updates</Typography>
    //       <Scrollbar sx={{ overflow: 'auto', maxHeight: { xs: '65vh', md: '65vh', lg: '60vh' } }}>
    //         {data?.map((comment) => {
    //           return (
    //             <TimelineItem>
    //               <TimelineOppositeContent color="textSecondary">
    //                 {formatDate(comment.creation)}
    //               </TimelineOppositeContent>
    //               <TimelineSeparator>
    //                 <TimelineDot />
    //                 <TimelineConnector />
    //               </TimelineSeparator>
    //               <TimelineContent>{messages(comment.content)}</TimelineContent>
    //             </TimelineItem>
    //           )
    //         })}
    //       </Scrollbar>
    //     </Box>
    //   </Timeline> :
    //     <Typography variant='h4'>No Updates</Typography>
    //   }
    // </ChildCard>
  )
}
