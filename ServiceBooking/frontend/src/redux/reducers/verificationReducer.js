

const initialState = {
  otpSent: false,
  otpValidated: false,
  image1: null,
  image2: null,
  phoneNumber: '',
  otpCode: '',
  error: null,
  otpVerified: false,
  verificationError: null,
  bookingStatusUpdated: false,
};

const verificationReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SEND_OTP_SUCCESS':
          return { ...state, otpSent: true, phoneNumber: action.payload.phoneNumber };
      case 'SEND_OTP_FAILURE':
          return { ...state, error: action.payload };
      case 'VERIFY_OTP_SUCCESS':
          return { ...state, otpValidated: true };
      case 'VERIFY_OTP_FAILURE':
          return { ...state, error: action.payload };
      case 'UPLOAD_IMAGES':
          return { ...state, image1: action.payload.image1, image2: action.payload.image2 };
      case 'RESET_VERIFICATION':
          return initialState;
      case 'UPDATE_BOOKING_STATUS_SUCCESS':
          return { ...state, bookingStatusUpdated: true };
       case 'UPDATE_BOOKING_STATUS_FAILURE':
          return { ...state, verificationError: action.payload };
      default:
          return state;
  }
};

export default verificationReducer;