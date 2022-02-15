import axios from "axios";

export const findAllPremises = async () => {
  const response = await axios.get("http://localhost:8080/api/v1/premises");
  return response.data;
};

export const postPremises = async (premises) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/api/v1/premises",
      data: premises,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const postBooking = async (premisesId, booking) => {
  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:8080/api/v1/premises/${premisesId}/bookings`,
      data: booking,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const findPremisesById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/premises/${id}`
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updatePremises = async (premises) => {
  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:8080/api/v1/premises/${premises.id}`,
      data: premises,
    });

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteBooking = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:8080/api/v1/bookings/${id}`,
    });
    return response;
  } catch (err) {
    return err;
  }
};
