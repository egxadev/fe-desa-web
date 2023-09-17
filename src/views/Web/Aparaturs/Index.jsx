import { useState, useEffect } from 'react';
import LayoutWeb from '../../../layouts/Web';
import Api from '../../../services/Api';
import AlertDataEmpty from '../../../components/general/AlertDataEmpty';
import Loading from '../../../components/general/Loading';
import CardAparatur from '../../../components/general/CardAparatur';

export default function Aparaturs() {
    document.title = 'Aparaturs - Desa Santri';

    const [aparaturs, setAparaturs] = useState([]);
    const [loadingAparatur, setLoadingAparatur] = useState(true);

    const fetchDataAparaturs = async () => {
        setLoadingAparatur(true);

        await Api.get('/api/public/aparaturs').then((response) => {
            setAparaturs(response.data.data);
            setLoadingAparatur(false);
        });
    };

    useEffect(() => {
        fetchDataAparaturs();
    }, []);

    return (
        <LayoutWeb>
            <div className='container mt-4 mb-3'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h5 className='text-uppercase'>
                            <i className='fa fa-user-circle'></i> Aparatur DESA
                        </h5>
                        <hr />
                    </div>
                </div>
                <div className='row mt-4'>
                    {loadingAparatur ? (
                        <Loading />
                    ) : aparaturs.length > 0 ? (
                        aparaturs.map((aparatur) => (
                            <CardAparatur
                                key={aparatur.id}
                                name={aparatur.name}
                                image={aparatur.image}
                                role={aparatur.role}
                            />
                        ))
                    ) : (
                        <AlertDataEmpty />
                    )}
                </div>
            </div>
        </LayoutWeb>
    );
}
