import React, { useState } from "react";
import Modal from "react-modal";
import { LuXCircle } from "react-icons/lu";
import styles from "../SizeGuide.module.css";
import image1 from "./../../../assets/images/men2.ca0ea170ba9cde809262.png";
import image2 from "./../../../assets/images/men1.9ca3c6bd9512dc4c88c2.png";
import { TbRuler } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

Modal.setAppElement("#root");

export default function MenSizeGuide() {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div onClick={openModal}>
        <TbRuler className={styles.icon} />
        {t("sizeGuide")}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={t("sizeGuide")}
        className={styles.sizeGuideModal}
        overlayClassName="sizeGuideOverlay"
      >
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <button onClick={closeModal} className={styles.closeButton}>
              <LuXCircle />
            </button>
            <div className={styles.sizeGuideContent}>
              <h2>{t("sizeGuide")}</h2>
              <div className={styles.sizeGuideContainer}>
                <img src={image1} alt="" />
                <div className={styles.sizeGuideTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>{t("size")}</th>
                        <th>{t("EU")}</th>
                        <th>{t("int")}</th>
                        <th>{t("a")}</th>
                        <th>{t("a")}</th>
                        <th>{t("b")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>27</td>
                        <td>42</td>
                        <td rowSpan={2}>XS</td>
                        <td>34</td>
                        <td>70-73</td>
                        <td rowSpan={2}>101</td>
                      </tr>
                      <tr>
                        <td>28</td>
                        <td>44</td>
                        <td>36</td>
                        <td>74-77</td>
                      </tr>
                      <tr>
                        <td>29</td>
                        <td rowSpan={2}>46</td>
                        <td rowSpan={2}>S</td>
                        <td>38</td>
                        <td>78-81</td>
                        <td rowSpan={2}>102</td>
                      </tr>
                      <tr>
                        <td>30</td>
                        <td>40</td>
                        <td>82-85</td>
                      </tr>
                      <tr>
                        <td>31</td>
                        <td rowSpan={2}>48</td>
                        <td rowSpan={2}>M</td>
                        <td>41</td>
                        <td>86-89</td>
                        <td rowSpan={2}>104</td>
                      </tr>
                      <tr>
                        <td>32</td>
                        <td>42</td>
                        <td>90-94</td>
                      </tr>
                      <tr>
                        <td>33</td>
                        <td rowSpan={2}>50</td>
                        <td rowSpan={2}>L</td>
                        <td>43</td>
                        <td>95-99</td>
                        <td rowSpan={2}>105</td>
                      </tr>
                      <tr>
                        <td>34</td>
                        <td>44</td>
                        <td>100-104</td>
                      </tr>
                      <tr>
                        <td>36</td>
                        <td>52</td>
                        <td rowSpan={2}>XL</td>
                        <td>46</td>
                        <td>105-109</td>
                        <td rowSpan={2}>106</td>
                      </tr>
                      <tr>
                        <td>38</td>
                        <td>54</td>
                        <td>48</td>
                        <td>110-115</td>
                      </tr>
                      <tr>
                        <td>40</td>
                        <td>56</td>
                        <td rowSpan={2}>XXL</td>
                        <td>50</td>
                        <td>116-121</td>
                        <td rowSpan={2}>108</td>
                      </tr>
                      <tr>
                        <td>42</td>
                        <td>58</td>
                        <td>52</td>
                        <td>122-127</td>
                      </tr>
                      <tr>
                        <td>44</td>
                        <td>60</td>
                        <td rowSpan={2}>3XL</td>
                        <td>55</td>
                        <td>128-132</td>
                        <td rowSpan={2}>110</td>
                      </tr>
                      <tr>
                        <td>46</td>
                        <td>62</td>
                        <td>58</td>
                        <td>133-138</td>
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
              <h2>{t("sizeGuide")}</h2>
              <div className={styles.sizeGuideContainer}>
                <img src={image2} alt="" />
                <div className={styles.sizeGuideTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>{t("size")}</th>
                        <th>{t("EU")}</th>
                        <th>{t("height")}</th>
                        <th>{t("chestGirth")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>XS</td>
                        <td>42</td>
                        <td>170</td>
                        <td>80-86</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>S</td>
                        <td>44</td>
                        <td rowSpan={2}>171-177</td>
                        <td>86-89</td>
                      </tr>
                      <tr>
                        <td>46</td>
                        <td>90-93</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>M</td>
                        <td>48</td>
                        <td rowSpan={2}>174-179</td>
                        <td>94-97</td>
                      </tr>
                      <tr>
                        <td>50</td>
                        <td>98-101</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>L</td>
                        <td>52</td>
                        <td rowSpan={2}>180-184</td>
                        <td>102-105</td>
                      </tr>
                      <tr>
                        <td>54</td>
                        <td>106-109</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>XL</td>
                        <td>56</td>
                        <td rowSpan={2}>182-186</td>
                        <td>110-113</td>
                      </tr>
                      <tr>
                        <td>58</td>
                        <td>114-117</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>XXL</td>
                        <td>60</td>
                        <td rowSpan={2}>184-188</td>
                        <td>118-121</td>
                      </tr>
                      <tr>
                        <td>62</td>
                        <td>122-125</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>3XL</td>
                        <td>64</td>
                        <td rowSpan={2}>186-192</td>
                        <td>126-129</td>
                      </tr>
                      <tr>
                        <td>66</td>
                        <td>130-133</td>
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