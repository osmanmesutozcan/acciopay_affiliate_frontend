import { Field, Form, Formik, FormikHelpers } from "formik";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Layout } from "../../components/common/layoutComponents/Layout";
import { PrimaryButton } from "../../components/common/Button";
import {
  accioPayEmail,
  alumYearOptions,
  countryCodeOptions,
  genderOptions,
  institutionsOfStudy,
  primaryColor,
} from "../../utils/config";
import { twMerge } from "tailwind-merge";
import { textInputClasses } from "../../components/common/Input";
import * as React from "react";
import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { InputBase, InputLabel, InputProps } from "@mui/material";
import { inspect } from "util";
import { DownIcon } from "../../components/common/iconComponents/DownArrowIcon";
import { Alert } from "../../components/common/Modal";
import { useState } from "react";
import useSWR from "swr";
import { ICustomerData } from "../../utils/schema";
import { IErrorProps } from "../../components/common/layoutComponents/Error";
import { fetcher, poster } from "../../utils/fetcher";
import { toPairs, valuesIn, values } from "lodash";
import { Loading, LoadingInline } from "../../components/common/layoutComponents/Loading";
import { parse } from "date-fns";

interface StyledInputProps extends InputProps {
  error?: boolean;
}

const BootstrapInput = styled(InputBase)<StyledInputProps>(({ error, theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "&": {
    // height: 40,
  },
  "& .MuiInputBase-input": {
    display: "flex",
    alignItems: "center",
    width: "100%",
    // height: 38,
    borderRadius: 2,
    backgroundColor: theme.palette.background.paper,
    border: error ? "1px solid #AF1E1E" : "1px solid #000000",
    fontSize: 12,
    padding: "8px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 2,
      borderColor: "#000000",
      boxShadow: "none",
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-outlined": {},
  },
}));
const VerifySchema = Yup.object().shape({
  full_name: Yup.string().required("Please enter full name"),
  residential_address: Yup.string().required("Please enter residential address"),
  date_of_birth: Yup.mixed().required("Please enter birthdate"),
  gender: Yup.string().required("Please select gender"),
  countryPhoneCode: Yup.string().required("Please enter phone code"),
  phoneNumber: Yup.string().required("Please enter phone number"),
  email: Yup.string().email("Must be a valid email").required("Please enter email"),
  institution: Yup.string().required("Please select institution of study"),
  alum_year: Yup.string().required("Please enter year of study"),
});

interface IFormValues {
  full_name: string;
  residential_address: string;
  date_of_birth: Date;
  gender: string;
  countryPhoneCode: string;
  phoneNumber: string;
  email: string;
  institution: string;
  alum_year: string;
  instagram: string;
  tiktok: string;
  agreeTerms: boolean;
}

export default function AffiliateSignup() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { data: userData, error: userError } = useSWR<{ data: ICustomerData }, IErrorProps>(
    "/api/customer/current",
    fetcher
  );

  if (!userData && !userError) {
    return (
      <Layout contentClassname="py-0 h-full justify-center">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout back title="Affiliate Program Application" contentClassname="pt-0">
      <Formik
        initialValues={{
          full_name: userData?.data?.legal_full_name || "",
          residential_address: userData?.data?.legal_address
            ? `${userData?.data?.legal_address?.block.value} ${userData?.data?.legal_address?.building.value}, ${userData?.data?.legal_address?.street.value}, ${userData?.data?.legal_address?.floor.value}, ${userData?.data?.legal_address?.unit.value}, ${userData?.data?.legal_address?.postal.value}`
            : "",
          gender: userData?.data?.gender || "",
          date_of_birth: userData ? (parse(userData?.data?.date_of_birth, "dd/MM/yyyy", new Date()) as Date) : null,
          email: userData?.data?.email || "",
          institution: "",
          alum_year: "",
          countryPhoneCode: userData?.data?.phone?.slice(0, 3) || "+65",
          phoneNumber: userData?.data?.phone?.slice(3) || "",
          instagram: "",
          tiktok: "",
          agreeTerms: false,
        }}
        validationSchema={VerifySchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values: IFormValues, { setSubmitting, resetForm }: FormikHelpers<IFormValues>) => {
          try {
            const res = await poster("/api/ambassador/apply", {
              full_name: values.full_name,
              residential_address: values.residential_address,
              gender: values.gender,
              date_of_birth: values.date_of_birth,
              email: values.email,
              institution: values.institution,
              alum_year: values.alum_year,
              phone: `${values.countryPhoneCode}${values.phoneNumber}`,
              additional: JSON.stringify({ instagram: values.instagram, tiktok: values.tiktok }),
            });

            if (res.message === "Success") {
              resetForm();
              setShowSuccessAlert(true);
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValidating,
          setFieldValue,

          /* and other goodies */
        }) => (
          <Form className="flex flex-col space-y-4">
            <h2 className="font-bold">Section 1: About you</h2>
            <div className="space-y-2 text-xs">
              <FormInputField
                label="Full name (as shown in NRIC/FIN)*:"
                fieldName="full_name"
                value={values.full_name}
                handleChange={handleChange}
                placeholder="Hong Chun"
                error={errors.full_name}
              />
              <FormInputField
                label="Residential Address*:"
                fieldName="residential_address"
                value={values.residential_address}
                handleChange={handleChange}
                placeholder="Block number building, street, floor, unit, postal code"
                error={errors.residential_address}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  inputFormat="dd/MM/yyyy"
                  value={values.date_of_birth}
                  onChange={(newValue) => {
                    setFieldValue("date_of_birth", newValue);
                  }}
                  renderInput={({ inputRef, inputProps }) => (
                    <div className="space-y-2">
                      <label htmlFor="date_of_birth" className="font-bold text-gray-detail">
                        Birthdate*:
                      </label>
                      <input
                        placeholder="31/01/2002"
                        ref={inputRef}
                        {...inputProps}
                        className={twMerge(textInputClasses, errors.date_of_birth && "border-danger-text")}
                        // value={values.date_of_birth}
                      />
                    </div>
                  )}
                />
              </LocalizationProvider>

              <FormSelectField
                label="Gender*:"
                fieldName="gender"
                value={values.gender}
                handleChange={handleChange}
                options={genderOptions}
                error={errors.gender}
                placeholder="Choose"
              />

              <div className="space-y-2">
                <label htmlFor="lastName" className="font-bold text-gray-detail">
                  Phone Number*:
                </label>
                <div className="flex">
                  <Field
                    id="countryPhoneCode"
                    name="countryPhoneCode"
                    component={CustomizedSelectForFormik}
                    value={values.countryPhoneCode}
                    sx={{
                      "& .MuiInputBase-input": {
                        width: 150,
                      },
                    }}
                    error={errors.countryPhoneCode}
                    options={countryCodeOptions.map((opt) => ({ value: opt.phoneCode, title: opt.phoneCode }))}
                  >
                    {countryCodeOptions.map((item) => (
                      <MenuItem
                        value={item.phoneCode}
                        key={`${item.code}-${item.countryName}`}
                        defaultValue={countryCodeOptions[0].phoneCode}
                      >
                        {item.phoneCode}
                      </MenuItem>
                    ))}
                  </Field>

                  <Field
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    placeholder="656565656"
                    className={twMerge(textInputClasses, "ml-2", errors.phoneNumber && "border-danger-text")}
                    error={errors.phoneNumber}
                  />
                </div>
              </div>

              <FormInputField
                label="School Email*:"
                fieldName="email"
                value={values.email}
                handleChange={handleChange}
                placeholder="school@mail.com"
                error={errors.email}
              />

              <FormSelectField
                label="Institution of Study*:"
                fieldName="institution"
                value={values.institution}
                handleChange={handleChange}
                options={institutionsOfStudy}
                error={errors.institution}
                placeholder="Choose"
              />

              <FormInputField
                type={"number"}
                label="Year of study*:"
                fieldName="alum_year"
                value={values.alum_year}
                handleChange={handleChange}
                placeholder="2020"
                error={errors.alum_year}
                pattern="[0-9]*"
              />
            </div>

            <h2 className="font-bold">Section 2: Social Media</h2>
            <p className="font-light">
              If you are interested to earning bonus commission through your socials, share your details below.
            </p>
            <div className="space-y-2 text-xs">
              <FormInputField label="Instagram username:" fieldName="instagram" handleChange={handleChange} />
              <FormInputField label="Tiktok Username:" fieldName="tiktok" handleChange={handleChange} />
            </div>

            <div className="">
              <div className="flex my-4">
                <Field
                  type="checkbox"
                  name="agreeTerms"
                  className="h-4 w-4 text-primary border-black rounded-sm mr-2"
                />
                <label htmlFor="agreeTerms" className="block text-xs">
                  By checking the box, you are certifying that all information is correct and that you are the person
                  completing this application.
                </label>
              </div>

              <p className="text-3xs text-gray-text">
                If you have trouble entering information or submitting the form, please reach out to us at
                {accioPayEmail.affiliate} or chat with us via telegram.
              </p>
            </div>
            {errors && (
              <div>
                {valuesIn(errors).map((v, idx) => (
                  <p className="text-danger-text" key={idx}>
                    {v}
                  </p>
                ))}
              </div>
            )}
            <PrimaryButton type="submit" disabled={!values.agreeTerms || isSubmitting}>
              {isSubmitting && <LoadingInline color="#fff" className="mr-2" />}
              Submit
            </PrimaryButton>
          </Form>
        )}
      </Formik>

      <Alert
        open={showSuccessAlert}
        setOpen={setShowSuccessAlert}
        text={"Form submitted successfully!"}
        button={
          <PrimaryButton onClick={() => setShowSuccessAlert(false)} className="w-full mt-4">
            OK
          </PrimaryButton>
        }
      />
    </Layout>
  );
}

interface IFormFieldProps {
  label: string;
  fieldName: string;
  value?: string | number | Date;
  handleChange: (e: React.ChangeEvent<any>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  form?: any;
  pattern?: string;
}

function FormInputField({
  label,
  fieldName,
  value,
  handleChange,
  placeholder,
  type,
  error,
  form,
  pattern,
}: IFormFieldProps) {
  return (
    <div className="space-y-2 affiliate_input">
      <label htmlFor={fieldName} className="font-bold text-gray-detail">
        {label}
      </label>
      <Field
        id={fieldName}
        name={fieldName}
        value={value}
        placeholder={placeholder}
        type={type}
        className={twMerge(textInputClasses, error && "border-danger-text")}
        onChange={handleChange}
        pattern={pattern}
      />
    </div>
  );
}

function CustomizedSelectForFormik({ children, form, field, error, placeholder, options, ...props }) {
  const { name, value, ...other } = field;
  const { setFieldValue } = form;

  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      displayEmpty
      input={<BootstrapInput error={form.errors[name]} />}
      IconComponent={() => <DownIcon className="absolute right-2 h-4 w-4 pointer-events-none" />}
      renderValue={(selected, ...rest) => {
        if (!selected || selected.length === 0) {
          return <em className="text-gray-text not-italic">{placeholder}</em>;
        }

        return options?.find((op) => selected === op.value).title;
      }}
      defaultValue={!value && placeholder ? undefined : options && options[0]?.value}
    >
      {children}
    </Select>
  );
}

function FormSelectField({
  label,
  fieldName,
  value,
  handleChange,
  options,
  error,
  placeholder,
}: IFormFieldProps & { options: { title: string; value: string | number }[] }) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={fieldName} className="font-bold text-gray-detail">
        {label}
      </label>
      <Field
        id={fieldName}
        name={fieldName}
        component={CustomizedSelectForFormik}
        options={options}
        placeholder={placeholder}
      >
        {options.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </Field>
    </div>
  );
}
