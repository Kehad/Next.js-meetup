import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetails(props) {
    return (
         <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail 
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />  
        </Fragment>
    );
}
export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1',
                },
            },
            {
                params: {
                    meetupId: 'm2',
                },
            }
        ],
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    console.log(meetupId)
  // fetch data from an API
  return {
    props: {
        meetupData: {
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
            title:'First Meetup',
            address:'Some Street 5, Some City',
            description:"This is a first meetup"
        },
    },
  };
}

export default MeetupDetails;
