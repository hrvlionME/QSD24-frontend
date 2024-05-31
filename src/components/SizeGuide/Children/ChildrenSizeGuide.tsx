import React, { useState } from "react";
import Modal from "react-modal";
import { LuXCircle } from "react-icons/lu";
import styles from "../SizeGuide.module.css";
import image1 from "./../../../assets/images/boy.8b28f8515cbf1bd52b6b.png";
import image2 from "./../../../assets/images/girl.de3abdee730708d45977.png";
import { TbRuler } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

Modal.setAppElement("#root");

export default function ChildrenSizeGuide() {
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
                        <th>Age</th>
                        <th>Height cm (A)</th>
                        <th>Weight kg cca</th>
                        <th>Chest cm (B)</th>
                        <th>Waist cm (C)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0-1y</td>
                        <td>&lt;86</td>
                        <td>&lt;10 kg</td>
                        <td>&lt;50</td>
                        <td>&lt;50</td>
                      </tr>
                      <tr>
                        <td>1-2y</td>
                        <td>86</td>
                        <td>11 kg</td>
                        <td>51-52</td>
                        <td>50-51</td>
                      </tr>
                      <tr>
                        <td>2-3y</td>
                        <td>98</td>
                        <td>15 kg</td>
                        <td>54-56</td>
                        <td>52-53</td>
                      </tr>
                      <tr>
                        <td>3-4y</td>
                        <td>104</td>
                        <td>17 kg</td>
                        <td>56-58</td>
                        <td>53-54</td>
                      </tr>
                      <tr>
                        <td>4-5y</td>
                        <td>110</td>
                        <td>XXS</td>
                        <td>58-60</td>
                        <td>55-56</td>
                      </tr>
                      <tr>
                        <td>5-6y</td>
                        <td>116</td>
                        <td>XXS</td>
                        <td>60-62</td>
                        <td>56-57</td>
                      </tr>
                      <tr>
                        <td>6-7y</td>
                        <td>122</td>
                        <td>XS</td>
                        <td>62-64</td>
                        <td>57-58</td>
                      </tr>
                      <tr>
                        <td>7-8y</td>
                        <td>128</td>
                        <td>S</td>
                        <td>65-68</td>
                        <td>58-59</td>
                      </tr>
                      <tr>
                        <td>8-9y</td>
                        <td>134</td>
                        <td>S</td>
                        <td>69-71</td>
                        <td>60-61</td>
                      </tr>
                      <tr>
                        <td>9-10y</td>
                        <td>140</td>
                        <td>M</td>
                        <td>72-74</td>
                        <td>62-63</td>
                      </tr>
                      <tr>
                        <td>10-11y</td>
                        <td>146</td>
                        <td>L</td>
                        <td>75-77</td>
                        <td>63-64</td>
                      </tr>
                      <tr>
                        <td>11-12y</td>
                        <td>152</td>
                        <td>L</td>
                        <td>78-79</td>
                        <td>64-65</td>
                      </tr>
                      <tr>
                        <td>12-13y</td>
                        <td>158</td>
                        <td>XL</td>
                        <td>80-82</td>
                        <td>65-66</td>
                      </tr>
                      <tr>
                        <td>13-14y</td>
                        <td>164</td>
                        <td>XL</td>
                        <td>83-85</td>
                        <td>67-68</td>
                      </tr>
                      <tr>
                        <td>14y+</td>
                        <td>170</td>
                        <td>XL</td>
                        <td>86-88</td>
                        <td>68-70</td>
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
                        <th>Age</th>
                        <th>Height cm (A)</th>
                        <th>Weight kg cca</th>
                        <th>Chest cm (B)</th>
                        <th>Waist cm (C)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0-1y</td>
                        <td>&lt;80</td>
                        <td>&lt;10 kg</td>
                        <td>&lt;49</td>
                        <td>&lt;49</td>
                      </tr>
                      <tr>
                        <td>1-2y</td>
                        <td>80-92</td>
                        <td>10-13 kg</td>
                        <td>49-54</td>
                        <td>51-54</td>
                      </tr>
                      <tr>
                        <td>2-3y</td>
                        <td>98</td>
                        <td>15 kg</td>
                        <td>54-56</td>
                        <td>52-53</td>
                      </tr>
                      <tr>
                        <td>3-4y</td>
                        <td>104</td>
                        <td>17 kg</td>
                        <td>56-58</td>
                        <td>53-54</td>
                      </tr>
                      <tr>
                        <td>4-5y</td>
                        <td>110</td>
                        <td>XXS</td>
                        <td>58-60</td>
                        <td>55-56</td>
                      </tr>
                      <tr>
                        <td>5-6y</td>
                        <td>116</td>
                        <td>XXS</td>
                        <td>60-62</td>
                        <td>56-57</td>
                      </tr>
                      <tr>
                        <td>6-7y</td>
                        <td>122</td>
                        <td>XS</td>
                        <td>62-64</td>
                        <td>57-58</td>
                      </tr>
                      <tr>
                        <td>7-8y</td>
                        <td>128</td>
                        <td>S</td>
                        <td>65-68</td>
                        <td>58-59</td>
                      </tr>
                      <tr>
                        <td>8-9y</td>
                        <td>134</td>
                        <td>S</td>
                        <td>69-71</td>
                        <td>60-61</td>
                      </tr>
                      <tr>
                        <td>9-10y</td>
                        <td>140</td>
                        <td>M</td>
                        <td>72-74</td>
                        <td>62-63</td>
                      </tr>
                      <tr>
                        <td>10-11y</td>
                        <td>146</td>
                        <td>L</td>
                        <td>75-77</td>
                        <td>63-64</td>
                      </tr>
                      <tr>
                        <td>11-12y</td>
                        <td>152</td>
                        <td>L</td>
                        <td>78-79</td>
                        <td>64-65</td>
                      </tr>
                      <tr>
                        <td>12-13y</td>
                        <td>158</td>
                        <td>XL</td>
                        <td>80-82</td>
                        <td>65-66</td>
                      </tr>
                      <tr>
                        <td>13-14y</td>
                        <td>164</td>
                        <td>XL</td>
                        <td>83-85</td>
                        <td>67-68</td>
                      </tr>
                      <tr>
                        <td>14y+</td>
                        <td>170</td>
                        <td>XL</td>
                        <td>86-88</td>
                        <td>68-70</td>
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
