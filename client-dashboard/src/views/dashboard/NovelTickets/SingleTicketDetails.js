import { Grid, Rating, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
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
import NovelTicketChat from './TicketChat/NovelTicketChat';

//Tab
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function SingleTicketDetails() {
  const { id } = useParams();

  //.------------------------------------------------------Fetching TicketData----------------------------------------------//
  const { data } = useFrappeGetDoc('Issue', id);

  //.-------------------------Tabs------------------------
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, gap: 2, width: '100%' }}>

      <ChildCard sx={{ minWidth: '50%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Ticket Details" value="1" />
              <Tab label="Updates" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {data &&
              <Left
                id={data.name}
                title={data.subject}
                rating={data.rating}
                raisedBy={data.raised_by}
                ratingDescription={data.rating_description}
                issueSubtype={data.custom_issue_subtype}
                issueType={data.issue_type}
                description={data.description}
                priority={data.priority}
                location={data.location}
              />}
          </TabPanel>
          <TabPanel value="2">
            {data && <Right id={data.name} statusTracker={data.issue_status_tracker} />}
          </TabPanel>
        </TabContext>
      </ChildCard>

      {data && <ChildCard>
        <NovelTicketChat id={data.name} title={data.subject} status={data.status} />
      </ChildCard>}
    </Box>
  )
}

function Left({ id, title, description, rating, raisedBy, ratingDescription, issueSubtype, issueType, priority, location }) {

  const formatDateTime = (inputDatetime, returnType) => {
    const date = new Date(inputDatetime);

    const pad = (num) => {
      return num < 10 ? '0' + num : num;
    }

    const formattedDate = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear().toString()}`;

    const hours = date.getHours();
    const minutes = pad(date.getMinutes());
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedTime = `${pad(hours % 12)}:${minutes} ${ampm}`;

    if (returnType === 'Date') {
      return formattedDate
    } else {
      return formattedTime
    }
  }

  //For location abbrivation
  let allLocations = [
    { shortName: "NTP", fullName: "Novel Tech Park - Kudlu Gate" },
    { shortName: "NOM", fullName: "Novel Office Marathahalli" },
    { shortName: "NOC", fullName: "Novel Office Central - MG Road" },
    { shortName: "NOQ", fullName: "Novel Office Queens- Queens Road" },
    { shortName: "NOW", fullName: "Novel Office WorkHub- Whitefield" },
    { shortName: "NBP", fullName: "Novel Business Park - Adugodi" },
    { shortName: "NOB", fullName: "Novel Office Brigade" },
    { shortName: "BTP1F", fullName: "Novel Office Brigade-Whitefield" },
  ]

  //Converting location 
  const getLocationName = (location) => {
    let locationObj = allLocations.find((element) => {
      return element.shortName == location;
    })
    if (locationObj) {
      return locationObj.fullName
    }
    return "No Location";
  }

  return (
    <Box >
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
        {/* <Grid item lg={6} xs={12} mt={4} mx={2}>
                <Typography variant="body2" color="text.secondary">
                  Issue Type
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                  {issueType}
                </Typography>
              </Grid> */}
        {/* <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  {status}
                </Typography>
              </Grid> */}

        <Grid item lg={6} xs={12} mt={4}>
          <Typography variant="body2" color="text.secondary">
            Issue Type
          </Typography>
          <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
            {issueType ? issueType : "No issue type"}
          </Typography>
        </Grid>
        <Grid item lg={6} xs={12} mt={4}>
          <Typography variant="body2" color="text.secondary">
            Issue Subtype
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
            {issueSubtype ? issueSubtype : "No issue sub type"}
          </Typography>
        </Grid>

        <Grid item lg={6} xs={12} mt={4}>
          <Typography variant="body2" color="text.secondary">
            Priority
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
            {priority}
          </Typography>
        </Grid>
        <Grid item lg={6} xs={12} mt={4}>
          <Typography variant="body2" color="text.secondary">
            Description
          </Typography>
          <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
            {description ? description : "No ticket description"}
          </Typography>
        </Grid>

        <Grid item lg={6} xs={12} mt={4}>
          <Typography variant="body2" color="text.secondary">
            Location
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
            {getLocationName(location)}
          </Typography>
        </Grid>
        <Grid item lg={6} xs={12} mt={4}>
          <Typography variant="body2" color="text.secondary">
            Raised By
          </Typography>
          <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
            {raisedBy}
          </Typography>
        </Grid>

        {/* <Grid item lg={6} xs={12} mt={4} mx={2}>
                <Typography variant="body2" color="text.secondary">
                  Issue Subtype
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                  {issueSubtype}
                </Typography>
              </Grid> */}
        {/* <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Creation date and time
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  {formatDateTime(creation, 'Date')} <br />
                  {formatDateTime(creation, 'Time')}
                </Typography>
              </Grid> */}
        {rating > 0 ?
          <>
            <Grid item lg={6} xs={12} mt={4}>
              <Typography variant="body2" mb={0.5} color="text.secondary">
                Rating
              </Typography>
              <Rating
                name="read-only"
                value={rating}
                readOnly
              />
            </Grid>
            <Grid item lg={6} xs={12} mt={4}>
              <Typography variant="body2" color="text.secondary">
                Review Description
              </Typography>
              <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                {ratingDescription ? ratingDescription : 'No review description'}
              </Typography>
            </Grid>
          </> : null}
      </Grid>
    </Box>
  )
}

function Right({ id, statusTracker }) {

  //,------------------------------------------------------Fetching comment List----------------------------------------------//
  const { data, error, isValidating, mutate } = useFrappeGetDocList('Comment', {
    fields: ['name', 'content', 'comment_email', 'creation', 'comment_by'],
    filters: [['reference_doctype', '=', 'Issue'], ['reference_name', '=', id]],
    // limit_start: start,
    limit: 10000,
    orderBy: {
      field: 'creation',
      order: 'desc', //asc
    },
  });

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

  return (
    <Box>
      {statusTracker?.length !== 0 ? <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        <Box>
          {/* <Typography variant="h4" sx={{ mt: "-1.3rem" }} mb={2}>Updates</Typography> */}
          <Scrollbar sx={{ overflow: 'auto', maxHeight: { xs: '60vh', md: '63vh', lg: '63vh' } }}>
            {statusTracker?.map((element) => {
              return (
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary" sx={{ fontSize: '0.6rem' }}>
                    {formatDate(element.changed_on)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{messages(element.post_value)}</TimelineContent>
                </TimelineItem>
              )
            })}
          </Scrollbar>
        </Box>
      </Timeline> :
        <Stack alignItems='center' justifyContent='center' width='100%' height='100%'>
          <Typography variant='h4'>No Updates</Typography>
        </Stack>
      }
    </Box>
  )
}
