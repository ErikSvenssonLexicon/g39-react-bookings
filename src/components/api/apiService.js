import axios from "axios";

export const authHeader = () => {
  const token = localStorage.getItem("booking_user")
  if(token) {
    return `Bearer ${token}`;
  }
  return "";
}

export const findAllPremises = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/premises",
        {headers: {Authorization: authHeader().toString()}}
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const postPremises = async (premises) => {
  try {
    const response = await axios({
      headers: {
        Authorization: authHeader()
      },
      method: "post",
      url: "http://localhost:8080/api/v1/premises",
      data: premises,
    });

    return response.data;
  } catch (err) {
    console.log(err)
    return err.response.data;
  }
};

export const postPatient = async (patient) => {
  try{
    const response = await axios({
      headers: {
        Authorization: authHeader()
      },
      method: "post",
      url: "http://localhost:8080/api/v1/public/register",
      data: patient
    });

    return response.data;

  }catch (err){
    return err.response.data;
  }
}

export const postBooking = async (premisesId, booking) => {
  try {
    const response = await axios({
      headers: {
        Authorization: authHeader()
      },
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
    const response = await axios.get(`http://localhost:8080/api/v1/premises/${id}`,
        {headers: {Authorization: authHeader()}}
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updatePremises = async (premises) => {
  try {
    const response = await axios({
      headers: {
        Authorization: authHeader()
      },
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
      headers: {
        Authorization: authHeader()
      },
      method: "delete",
      url: `http://localhost:8080/api/v1/bookings/${id}`,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const login = async (loginCommand) => {
  try{
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/api/v1/public/auth",
      data: loginCommand
    })
    return response.data;
  }catch (err){
    console.log(err);
    return err;
  }
}

export const findPatientById = async  (id) =>{
  try{
    const response = await axios({
      headers: {
        Authorization: authHeader()
      },
      method: "get",
      url: `http://localhost:8080/api/v1/patients/${id}`
    })
    return response.data;
  }catch (err){
    return err.response.data;
  }
}
