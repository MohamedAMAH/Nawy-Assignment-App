import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getApartmentById, Apartment } from '../../services/api';
import styles from '../../styles/apartments/ApartmentDetails.module.css';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function ApartmentDetails() {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const fetchApartmentDetails = async () => {
      try {
        // throw new Error('Internal server error. Please try to refresh.');
        // await sleep(4000);
        const data = await getApartmentById(id as string);
        setApartment(data);
        setLoading(false);
      } catch (err) {
        setError('Internal server error. Please try to refresh.');
        setLoading(false);
      }
    };
    fetchApartmentDetails();
  }, [id]);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>
          {loading ? 'Loading...' : 
           error ? 'Error' : 
           !apartment ? 'Not Found' : 
           `Unit ${apartment.apartmentNumber}`}
        </title>
      </Head>
      <div className="container py-5">
        <button 
          className={`${styles.backButton} mb-5`}
          onClick={handleBack}
        >
          ← Back to Listings
        </button>

        {loading ? (
          <div className={styles.shimmerContainer}>
            <div className={styles.headerSection}>
              <div className={styles.shimmerTitle}></div>
              <div className={styles.shimmerAddress}></div>
              <div className={styles.shimmerProject}></div>
              <div className={styles.shimmerPrice}></div>
            </div>

            <div className={styles.shimmerInfoGrid}>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={styles.shimmerInfoItem}>
                  <div className={styles.shimmerInfoLabel}></div>
                  <div className={styles.shimmerInfoValue}></div>
                </div>
              ))}
            </div>

            <div className={styles.shimmerDescription}></div>

            <div className={styles.shimmerCta}></div>
          </div>
        ) : error ? (
          <p className="text-center text-danger mt-3">{error}</p>
        ) : !apartment ? (
          <p className="text-center text-muted mt-3">Apartment does not exist. Please double check.</p>
        ) : (
          <>
            <div className={styles.headerSection}>
              <h1 className={styles.apartmentTitle}>{apartment.name}</h1>
              <div className={styles.apartmentAddress}>{apartment.address}</div>
              {apartment.project && (
                <div className={styles.apartmentProject}>Project: {apartment.project}</div>
              )}
              <div className={styles.apartmentPrice}>${apartment.price.toLocaleString()}</div>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Apartment</div>
                <div className={styles.infoValue}>{apartment.apartmentNumber}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Bedrooms</div>
                <div className={styles.infoValue}>{apartment.bedrooms}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Bathrooms</div>
                <div className={styles.infoValue}>{apartment.bathrooms}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Area</div>
                <div className={styles.infoValue}>{apartment.area} sqm</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Status</div>
                <div className={styles.infoValue}>
                  <span className={apartment.available ? styles.available : styles.unavailable}>
                    {apartment.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>

            <div className="description-section">
              <p className={styles.descriptionText}>{apartment.description}</p>
            </div>

            <div className={styles.ctaSection}>
              <button className="btn btn-dark btn-lg">Contact Agent</button>
            </div>
          </>
        )}
      </div>
    </>
  );
} 