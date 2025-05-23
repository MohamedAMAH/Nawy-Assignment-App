import { useState } from 'react';
import styles from '../../styles/apartments/ApartmentForm.module.css';

interface ApartmentFormProps {
  onClose: () => void;
}

const ApartmentForm = ({ onClose }: ApartmentFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    apartmentNumber: '',
    address: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    project: '',
    available: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
    console.log(formData);
    onClose();
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>Create New Apartment</h2>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Apartment Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter apartment name"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="apartmentNumber">Apartment Number*</label>
              <input
                type="text"
                id="apartmentNumber"
                name="apartmentNumber"
                value={formData.apartmentNumber}
                onChange={handleChange}
                required
                placeholder="e.g. A101"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="project">Project*</label>
              <input
                type="text"
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
                placeholder="Project name"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="price">Price ($)*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="Enter price in USD"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="bedrooms">Bedrooms*</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                min="0"
                placeholder="Number of bedrooms"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="bathrooms">Bathrooms*</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                min="0"
                placeholder="Number of bathrooms"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="area">Area (sqm)*</label>
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                min="0"
                placeholder="Area in square meters"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="available">Availability</label>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                />
                <label htmlFor="available" className={styles.checkboxLabel}>
                  Available for sale
                </label>
              </div>
            </div>
            
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="address">Address*</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Full address"
              />
            </div>
            
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Detailed description of the apartment"
              />
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Create Apartment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApartmentForm; 