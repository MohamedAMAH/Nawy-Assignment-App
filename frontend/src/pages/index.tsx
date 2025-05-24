import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getApartments, Apartment } from '../services/api';
import ApartmentForm from '../components/apartments/ApartmentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Index.module.css';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const fetchApartments = async () => {
    try {
      // throw new Error('Internal server error. Please try to refresh.');
      // await sleep(4000);
      const data = await getApartments();
      setApartments(data);
      setFilteredApartments(data);
      setLoading(false);
    } catch (err) {
      setError('Internal server error. Please try to refresh.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredApartments(apartments);
      return;
    }
    const term = searchTerm.toLowerCase().trim();
    const filtered = apartments.filter(apartment => 
      apartment.name.toLowerCase().includes(term) || 
      apartment.apartmentNumber.toLowerCase().includes(term) || 
      (apartment.project && apartment.project.toLowerCase().includes(term))
    );  
    setFilteredApartments(filtered);
  }, [searchTerm, apartments]);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleApartmentCreated = () => {
    fetchApartments();
    setShowForm(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Nawy Apartments</title>
      </Head>
      <div className="container py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-3">
          <h1 className="fw-bold mb-0">Available Apartments</h1>
          <button className="btn btn-dark" onClick={handleOpenForm}>Create Apartment</button>
        </div>

        <div className={styles.searchContainer + " mb-4"}>
          <div className={styles.inputGroup}>
            <span className={styles.inputGroupText}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input 
              type="text" 
              className={styles.formControl} 
              placeholder="Search by name, unit number, or project..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {showForm && (
          <ApartmentForm 
            onClose={handleCloseForm} 
            onSuccess={handleApartmentCreated}
          />
        )}

        {error ? (
          <p className="text-center text-danger mt-3">{error}</p>
        ) : loading ? (
          <div className="row">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-4 mb-4">
                <div className={styles.apartmentCard + " border-0 h-100 " + styles.shimmer}>
                  <div className="card-body p-4">
                    <div className={styles.shimmerUnitNumber}></div>
                    <div className={styles.shimmerTitle}></div>
                    <div className={styles.shimmerProject}></div>
                    <div className={styles.shimmerPrice}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredApartments.length === 0 ? (
          <p className="text-center text-muted mt-3">
            {searchTerm ? 'No apartments match your search criteria.' : 'There are no apartments for sale right now.'}
          </p>
        ) : (
          <div className="row">
            {filteredApartments.map((apartment) => (
              <div key={apartment._id} className="col-12 col-sm-6 col-lg-4 mb-4">
                <div 
                  className={styles.apartmentCard + " border-0 h-100"} 
                  onClick={() => router.push(`/apartments/${apartment._id}`)}
                >
                  <div className="card-body p-4 position-relative">
                    <div className={styles.apartmentIcon}>
                      <FontAwesomeIcon icon={faBuilding} size="lg" />
                    </div>
                    <div className={styles.apartmentNumber + " mb-2"}>
                      Unit {apartment.apartmentNumber}
                    </div>
                    <h5 className="card-title mb-3 fw-bold">{apartment.name}</h5>
                    {apartment.project && (
                      <div className={styles.apartmentProject + " mb-3"}>
                        {apartment.project}
                      </div>
                    )}
                    <div className={styles.apartmentPrice + " mt-auto"}>${apartment.price.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}