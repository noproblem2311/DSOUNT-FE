import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Layout } from 'antd';
const { Content } = Layout;

const RecordDetail = () => {
    const { id } = useParams();
    const [record, setRecord] = useState(null);

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/videos/${id}/`);
                setRecord(response.data);
            } catch (error) {
                console.error('There was an error fetching the record details:', error);
            }
        };

        fetchRecord();
    }, [id]);

    if (!record) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Button className='wi' href='http://localhost:3000/'>BACK</Button>
            <Layout>
                <Content className="flex justify-center items-center flex-col">
                    <h2 className="text-center text-2xl font-bold my-4">Video Detail</h2>
                    <div className="flex justify-center w-full">
                        <video width="1300" controls className="mb-4">
                            <source src={record.video_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <p className="w-full max-w-screen-lg text-center">{record.transcript}</p>
                    {/* Thêm box note ở đây */}
                    <div className="w-full max-w-screen-lg mt-4 p-4 bg-gray-100 rounded shadow">
                        <h3 className="text-lg font-semibold">Note</h3>
                        <p>{record.note || 'No notes available for this record.'}</p>
                    </div>
                </Content>
            </Layout>
        </>
    );
};

export default RecordDetail;
