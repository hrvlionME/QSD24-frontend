import React, { useState } from "react";
import Modal from "react-modal";
import { LuXCircle } from "react-icons/lu";
import styles from "../SizeGuide.module.css";
import image1 from "./../../../assets/images/woman1.c375fb4f5d4337b906a6.png";
import image2 from "./../../../assets/images/woman2.2a9ebbf8a2dd3c007040.png";
import { TbRuler } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

Modal.setAppElement("#root");

export default function WomenSizeGuide() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div onClick={openModal} className={styles.openButton}>
        <TbRuler className={styles.icon} />
        Size Guide
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Size Guide"
        className={styles.sizeGuideModal}
        overlayClassName="sizeGuideOverlay"
      >
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper: any) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <button onClick={closeModal} className={styles.closeButton}>
              <LuXCircle />
            </button>
            <div className={styles.sizeGuideContent}>
              <h2>Size Guide</h2>
              <div className={styles.sizeGuideContainer}>
                <img src={image1} alt="" />
                <div className={styles.sizeGuideTable}>
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={2}>Size</th>
                        <th>A: Height</th>
                        <th>B: Chest</th>
                        <th>C: Hips</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>XXS</td>
                        <td>32</td>
                        <td>158-163</td>
                        <td>74-77</td>
                        <td>80-85</td>
                      </tr>
                      <tr>
                        <td>XS</td>
                        <td>34</td>
                        <td>162-167</td>
                        <td>81-84</td>
                        <td>85-90</td>
                      </tr>
                      <tr>
                        <td>S</td>
                        <td>36</td>
                        <td>165-169</td>
                        <td>85-88</td>
                        <td>90-95</td>
                      </tr>
                      <tr>
                        <td>M</td>
                        <td>38</td>
                        <td>167-171</td>
                        <td>89-92</td>
                        <td>95-100</td>
                      </tr>
                      <tr>
                        <td>L</td>
                        <td>40</td>
                        <td>169-173</td>
                        <td>93-96</td>
                        <td>100-106</td>
                      </tr>
                      <tr>
                        <td>XL</td>
                        <td>42</td>
                        <td>171-175</td>
                        <td>97-100</td>
                        <td>106-114</td>
                      </tr>
                      <tr>
                        <td>XXL</td>
                        <td>44</td>
                        <td>172-176</td>
                        <td>100-103</td>
                        <td>114-122</td>
                      </tr>
                      <tr>
                        <td>3XL</td>
                        <td>46</td>
                        <td>-</td>
                        <td>103-107</td>
                        <td>122-126</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <button onClick={closeModal} className={styles.closeButton}>
              <LuXCircle />
            </button>
            <div className={styles.sizeGuideContent}>
              <h2>Size Guide</h2>
              <div className={styles.sizeGuideContainer}>
                <img src={image2} alt="" />
                <div className={styles.sizeGuideTable}>
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={2}>Size</th>
                        <th>A: Height</th>
                        <th>B: Chest</th>
                        <th>C: Waist</th>
                        <th>D: Hips</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>XXS</td>
                        <td>32</td>
                        <td>158-163</td>
                        <td>74-77</td>
                        <td>60-62</td>
                        <td>84-87</td>
                      </tr>
                      <tr>
                        <td>XS</td>
                        <td>34</td>
                        <td>162-165</td>
                        <td>81-84</td>
                        <td>63-66</td>
                        <td>89-92</td>
                      </tr>
                      <tr>
                        <td>S</td>
                        <td>36</td>
                        <td>165-169</td>
                        <td>85-88</td>
                        <td>67-70</td>
                        <td>93-96</td>
                      </tr>
                      <tr>
                        <td>M</td>
                        <td>38</td>
                        <td>167-171</td>
                        <td>89-92</td>
                        <td>71-74</td>
                        <td>97-101</td>
                      </tr>
                      <tr>
                        <td>L</td>
                        <td>40</td>
                        <td>169-173</td>
                        <td>93-96</td>
                        <td>75-78</td>
                        <td>102-105</td>
                      </tr>
                      <tr>
                        <td>XL</td>
                        <td>42</td>
                        <td>171-175</td>
                        <td>97-100</td>
                        <td>79-82</td>
                        <td>106-109</td>
                      </tr>
                      <tr>
                        <td>XXL</td>
                        <td>44</td>
                        <td>172-176</td>
                        <td>100-103</td>
                        <td>83-86</td>
                        <td>110-113</td>
                      </tr>
                      <tr>
                        <td>3XL</td>
                        <td>46</td>
                        <td>173-178</td>
                        <td>103-107</td>
                        <td>87-91</td>
                        <td>111-115</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </Modal>
    </div>
  );
}
