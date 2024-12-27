import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Alert,
  Grid,
  InputAdornment,
  IconButton,
  MenuItem,
  Select
} from '@mui/material';
import toast from 'react-hot-toast';
import axiosInstance from 'utils/axiosInstance';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#008080',
    color: theme.palette.common.white
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function ManagePatient() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add', 'edit', 'view'
  const [dialogData, setDialogData] = useState({});
  const [operationalData, setOperationalData] = useState({
    fullName: '',
    email: '',
    age: '',
    address: '',
    contactNumber: '',
    medicalHistory: '',
    assignedDoctor: {
      fullName: '',
      contactNumber: '',
      specialization: ''
    },
    registrationDate: ''
  });

  const [alertOpen, setAlertOpen] = useState(false); // Alert for isMarquee
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Delete confirmation dialog
  const [jobToDelete, setJobToDelete] = useState(null); // Job to delete
  const [loading, setLoading] = useState(false); //loading state
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const [pendingCloseAction, setPendingCloseAction] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [assignedDoctor, setAssignedDoctor] = useState([]);
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    setLoading(true); // Start loading
    axiosInstance
      .get('/patient/all') // API to fetch employee data
      .then((response) => {
        const patient = response.data.data.patients; // Assuming the response is an array of employees
        setData(patient); // Store the employee data in the state
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching the employees:', error);
        toast.error('Something went wrong in employee fetching!😠', error);
        setLoading(false); // Stop loading on error
      });
  };

  const handleClickOpen = (mode, data = {}) => {
    const loadingToastId = toast.loading('🖐️Hold on 🎁 Loading...', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff'
      }
    });

    setDialogMode(mode);
    setDialogData(data);

    setTimeout(() => {
      setOperationalData({
        fullName: data.fullName || '',
        email: data.email || '',
        age: data.age || '',
        address: data.address || '',
        contactNumber: data.contactNumber || '',
        medicalHistory: data.medicalHistory || '',
        assignedDoctor: {
          fullName: data.assignedDoctor?.name || '',
          contactNumber: data.assignedDoctor?.phone || '',
          specialization: data.assignedDoctor?.specialization || '',
          assignedDoctor: assignedDoctor._id || ''
        },
        registrationDate: data.registrationDate || ''
      });

      toast.dismiss(loadingToastId);
      setOpen(true);
    }, 100);
  };

  const handleClose = (action = null) => {
    if (dialogMode === 'view') {
      // Directly close the dialog when in 'view' mode, no confirmation needed
      setOpen(false);
    } else {
      if (action === 'confirm') {
        setOpen(false); // Close the dialog if confirmed
      } else {
        setPendingCloseAction(action); // Store the action (outside click or cancel)
        setConfirmCloseOpen(true); // Open the confirmation dialog
      }
    }
  };

  const handleConfirmClose = (confirm) => {
    if (confirm) {
      setOpen(false); // Close if user confirms
    }
    setConfirmCloseOpen(false); // Close the confirmation dialog
  };

  const handleSubmit = async () => {
    const loadingToastId = toast.loading('Submitting...', {
      // Show loading toast
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff'
      }
    });

    try {
      if (dialogMode === 'add') {
        await axiosInstance.post('/patient/add', operationalData);
        toast.success('Employee added successfully!🎉');
      } else if (dialogMode === 'edit') {
        await axiosInstance.put(`/patient/update/${dialogData.id}`, operationalData);
        toast.success('Employee updated successfully!🖊️😍');
      }

      fetchPatients(); // Refresh the data
      handleClose(); // Close the dialog

      toast.dismiss(loadingToastId); // Dismiss loading toast after success
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error(`"😡Error is: " ${error.response?.data?.message || 'Unknown error'}`);
      toast.dismiss(loadingToastId); // Dismiss loading toast if there's an error
    }
  };

  const handleDeleteDialogOpen = (job) => {
    setJobToDelete(job);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/patient/delete/${jobToDelete.id}`);
      fetchPatients();
      setDeleteDialogOpen(false);
      setJobToDelete(null);
      toast.success('Deleted Sucessfully🥲!');
    } catch (error) {
      console.error('Error deleting..:', error);
      toast.error('Something went Wrong in deleting!😠');
    }
  };

  // ################### Array of News Categories #############
  const getDoctors = () => {
    setLoading(true); // Start loading
    axiosInstance
      .get('/doctor/all')
      .then((response) => {
        const doctorsData = response.data.data.doctors;
        setAssignedDoctor(doctorsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the departments:', error);
        toast.error('Something went wrong in fetching departments!😠', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div>
      <h3
        style={{
          textAlign: 'right'
        }}
        onClick={() => handleClickOpen('add')}
      >
        <Button variant="contained" style={{ backgroundColor: '#008080' }}>
          {' '}
          Add New Patient
        </Button>
      </h3>

      {alertOpen && (
        <Alert severity="warning" onClose={() => setAlertOpen(false)} style={{ marginBottom: '10px' }}>
          You can't add more than 5 Marquee Active jobs!
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr. No.</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>Contact Number</StyledTableCell>
              <StyledTableCell>Assigned Doctor</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <div
              style={{
                textAlign: 'center',
                fontSize: '18px',
                color: '#008080'
              }}
            >
              Loading Data...
            </div>
          ) : (
            <TableBody>
              {data.map((job, index) => (
                <StyledTableRow key={job._id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {job.fullName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {job.email || '-'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {job.age || '-'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {job.contactNumber || '-'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {job.assignedDoctor?.fullName || '-'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <EyeOutlined
                      style={{
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: 'green',
                        marginRight: '8px'
                      }}
                      onClick={() => handleClickOpen('view', job)}
                    />
                    <EditOutlined
                      style={{
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: 'blue',
                        marginRight: '8px'
                      }}
                      onClick={() => handleClickOpen('edit', job)}
                    />
                    <DeleteOutlined
                      style={{
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: 'red'
                      }}
                      onClick={() => handleDeleteDialogOpen(job)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* Add/Edit/View Job Dialog */}
      <Dialog
        open={open}
        onClose={() => handleClose('outsideClick')} // Instead of directly closing
        disableBackdropClick
        maxWidth="md"
      >
        <DialogTitle>{dialogMode === 'add' ? 'Add Patient' : dialogMode === 'edit' ? 'Edit Patient' : 'Job Details'}</DialogTitle>
        <DialogContent style={{ minWidth: '500px' }}>
          {dialogMode === 'view' ? (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
              <Grid container spacing={3}>
                {/* Profile Heading */}
                <Grid item xs={12}>
                  <h2 style={{ textAlign: 'center', color: '#008080', marginBottom: '20px' }}>Profile Information</h2>
                </Grid>

                {/* Full Name */}
                <Grid item xs={12}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Full Name:</strong> {dialogData.fullName || 'N/A'}
                  </p>
                </Grid>

                {/* Email and Age */}
                <Grid item xs={6}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Email:</strong> {dialogData.email || 'N/A'}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Age:</strong> {dialogData.age || 'N/A'}
                  </p>
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Address:</strong> {dialogData.address || 'N/A'}
                  </p>
                </Grid>

                {/* Contact Number */}
                <Grid item xs={12}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Contact Number:</strong> {dialogData.contactNumber || 'N/A'}
                  </p>
                </Grid>

                {/* Medical History */}
                <Grid item xs={12}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Medical History:</strong> {dialogData.medicalHistory || 'N/A'}
                  </p>
                </Grid>

                {/* Assigned Doctor */}
                <Grid item xs={12}>
                  <h3 style={{ color: '#008080', marginBottom: '10px' }}>Assigned Doctor:</h3>
                </Grid>
                <Grid item xs={4}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Name:</strong> {dialogData.assignedDoctor.fullName || 'N/A'}
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Contact:</strong> {dialogData.assignedDoctor.contactNumber || 'N/A'}
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Specialization:</strong> {dialogData.assignedDoctor.specialization || 'N/A'}
                  </p>
                </Grid>

                {/* Registration Date */}
                <Grid item xs={12}>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                    <strong style={{ color: '#008080' }}>Registration Date:</strong>
                    {new Date(dialogData.registrationDate).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </Grid>
              </Grid>
            </div>
          ) : (
            <>
              {/* Other Fields */}
              <label
                htmlFor="Full Name"
                style={{
                  fontSize: '15px',
                  color: '#008080',
                  fontWeight: 'bolder',
                  marginTop: '10px',
                  display: 'block'
                }}
              >
                Full Name
              </label>
              <TextField
                margin="dense"
                label="Full Name"
                fullWidth
                variant="outlined"
                value={operationalData.fullName}
                onChange={(e) => setOperationalData({ ...operationalData, fullName: e.target.value })}
                required
                type="name"
              />

              <label
                htmlFor="Email"
                style={{
                  fontSize: '15px',
                  color: '#008080',
                  fontWeight: 'bolder',
                  marginTop: '10px',
                  display: 'block'
                }}
              >
                Email
              </label>
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                variant="outlined"
                value={operationalData.email}
                onChange={(e) => setOperationalData({ ...operationalData, email: e.target.value })}
                required
                type="email"
              />

              <label
                htmlFor="Age"
                style={{
                  fontSize: '15px',
                  color: '#008080',
                  fontWeight: 'bolder',
                  marginTop: '10px',
                  display: 'block'
                }}
              >
                Age
              </label>
              <TextField
                margin="dense"
                label="Age"
                fullWidth
                variant="outlined"
                value={operationalData.age}
                onChange={(e) => setOperationalData({ ...operationalData, age: e.target.value })}
                required
                type="number"
              />

              {/* Address */}
              <label
                htmlFor="Address"
                style={{
                  fontSize: '15px',
                  color: '#008080',
                  fontWeight: 'bolder',
                  marginTop: '10px',
                  display: 'block'
                }}
              >
                Address
              </label>
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                variant="outlined"
                value={operationalData.address}
                onChange={(e) => setOperationalData({ ...operationalData, address: e.target.value })}
                required
              />

              {/* Contact Number */}
              <label
                htmlFor="Contact Number"
                style={{
                  fontSize: '15px',
                  color: '#008080',
                  fontWeight: 'bolder',
                  marginTop: '10px',
                  display: 'block'
                }}
              >
                Contact Number
              </label>
              <TextField
                margin="dense"
                label="Contact Number"
                fullWidth
                variant="outlined"
                value={operationalData.contactNumber}
                onChange={(e) => setOperationalData({ ...operationalData, contactNumber: e.target.value })}
                required
                type="contact"
              />

              {/* Medical History */}
              <label
                htmlFor="Medical History"
                style={{
                  fontSize: '15px',
                  color: '#008080',
                  fontWeight: 'bolder',
                  marginTop: '10px',
                  display: 'block'
                }}
              >
                Medical History
              </label>
              <TextField
                margin="dense"
                label="Medical History"
                fullWidth
                variant="outlined"
                value={operationalData.medicalHistory}
                onChange={(e) => setOperationalData({ ...operationalData, medicalHistory: e.target.value })}
                required
              />

              {/* Assigned Doctor - Select Field */}
              <label
                htmlFor="Assigned Doctor"
                style={{
                  fontSize: '15px',
                  color: '#008080',
                  fontWeight: 'bolder',
                  marginTop: '10px',
                  display: 'block'
                }}
              >
                Assigned Doctor
              </label>

              <Select
                labelId="Department-label"
                fullWidth
                value={operationalData.assignedDoctor || ''} // Ensure `_id` is used
                onChange={(e) =>
                  setOperationalData({
                    ...operationalData,
                    assignedDoctor: e.target.value // Assign only the selected doctor's `_id`
                  })
                }
                label="Department"
                variant="outlined"
              >

                {assignedDoctor.map((dep) => (
                  <MenuItem key={dep.id} value={dep.id}>
                    {dep.fullName}
                  </MenuItem>
                ))}
              </Select>
              
              <label
                htmlFor="Registration Date"
                style={{
                  fontSize: '15px',
                  color: '#008080',
                  fontWeight: 'bolder',
                  marginTop: '10px',
                  display: 'block'
                }}
              >
                Registration Date
              </label>
              <TextField
                margin="dense"
                label="Registration Date"
                fullWidth
                variant="outlined"
                type="date"
                value={operationalData.registrationDate}
                onChange={(e) => setOperationalData({ ...operationalData, registrationDate: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {dialogMode !== 'view' && (
            <Button onClick={handleSubmit} color="primary" variant="contained">
              {dialogMode === 'add' ? 'Add' : 'Update'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* close confirm */}
      <Dialog open={confirmCloseOpen}>
        <DialogTitle>Are you sure you want to close?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleConfirmClose(true)}>Yes</Button>
          <Button onClick={() => handleConfirmClose(false)}>No</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this Data "{dialogData.name}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
