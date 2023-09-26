import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

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
    const client = await MongoClient.connect(
      "mongodb+srv://kehad01:Keahnney01@cluster0.eu6zk1q.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db("next-js-mongodb");

    const meetupsCollection = db.collection("meetups");
     const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

     client.close();
    return {
      fallback: false,
      paths: meetups.map((meetup) => ({
        params: { meetupId: meetup._id.toString() },
      })),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    console.log(meetupId)
    const client = await MongoClient.connect(
      "mongodb+srv://kehad01:Keahnney01@cluster0.eu6zk1q.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db("next-js-mongodb");

    const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({
      _id: new ObjectId(meetupId),
    });

    console.log(selectedMeetup, selectedMeetup)
    client.close();
  // fetch data from an API
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
