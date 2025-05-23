// pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getApartments, Apartment } from '../services/api';
import ApartmentForm from '../components/apartments/ApartmentForm';
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

  useEffect(() => {
    const fetchApartments = async () => {
      try {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Available Apartments</h1>
        <button className="btn btn-dark" onClick={handleOpenForm}>Create Apartment</button>
      </div>

      <div className={styles.searchContainer + " mb-4"}>
        <div className={styles.inputGroup}>
          <span className={styles.inputGroupText}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
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

      {showForm && <ApartmentForm onClose={handleCloseForm} />}

      {error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : loading ? (
        <div className="row">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className={styles.apartmentCard + " border-0 h-100 " + styles.shimmer}>
                <div className="card-body p-4">
                  <div className={styles.shimmerLine}></div>
                  <div className={styles.shimmerLine}></div>
                  <div className={styles.shimmerLine}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredApartments.length === 0 ? (
        <div className="alert alert-info text-center">
          {searchTerm ? 'No apartments match your search criteria.' : 'There are no apartments for sale right now.'}
        </div>
      ) : (
        <div className="row">
          {filteredApartments.map((apartment) => (
            <div key={apartment._id} className="col-md-4 mb-4">
              <div 
                className={styles.apartmentCard + " border-0 h-100"} 
                onClick={() => router.push(`/apartments/${apartment._id}`)}
              >
                <div className="card-body p-4 position-relative">
                  <div className={styles.buildingIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
                      <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
                    </svg>
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
  );
}