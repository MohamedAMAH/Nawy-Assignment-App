import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
        await sleep(4000);
        const data = await getApartmentById(id as string);
        setApartment(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch apartment details:', err);
        setError('Failed to load apartment details');
        setLoading(false);
      }
    };
    fetchApartmentDetails();
  }, [id]);

  const handleBack = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className={`${styles.shimmer} ${styles.backButtonShimmer}`}></div>
        <div className={`${styles.shimmer} ${styles.apartmentDetails}`}>
          <div className={styles.detailsShimmerContainer}>
            <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.titleShimmer}`}></div>
            <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.addressShimmer}`}></div>
            <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.priceShimmer}`}></div>
            
            <div className={styles.infoGridShimmer}>
              <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.infoItemShimmer}`}></div>
              <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.infoItemShimmer}`}></div>
              <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.infoItemShimmer}`}></div>
              <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.infoItemShimmer}`}></div>
            </div>
            
            <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.descriptionShimmer}`}></div>
            <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.descriptionShimmer}`}></div>
            <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.descriptionShimmer}`}></div>
            
            <div className={styles.ctaContainerShimmer}>
              <div className={`${styles.shimmer} ${styles.shimmerLine} ${styles.ctaShimmer}`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !apartment) {
    return (
      <div className="container py-5">
        <div className={styles.errorContainer}>
          <h2>Error</h2>
          <p>{error || 'Apartment not found'}</p>
          <button 
            className="btn btn-dark" 
            onClick={handleBack}
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button 
        className={`${styles.backButton} mb-4`}
        onClick={handleBack}
      >
        ← Back to Listings
      </button>

      <div className={styles.apartmentDetails}>
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
      </div>
    </div>
  );
} 