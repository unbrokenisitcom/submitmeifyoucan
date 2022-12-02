import { UsernameValidator } from './../validators/username.validator';
import { PhoneValidator } from './../validators/phone.validator';
import { Country } from './../validators/country.model';
import { ParentErrorStateMatcher, PasswordValidator } from './../validators/password.validator';
import { formulaire } from './../models/formulaire';
import { Form, NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-animate-form',
  templateUrl: './animate-form.component.html',
  styleUrls: ['./animate-form.component.scss']
})
export class AnimateFormComponent implements OnInit {


  f :NgForm;
  public formulaire: formulaire;
  username:string

  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  matchingPasswordsGroup: FormGroup;
  countryPhoneGroup: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = [
    "Male",
    "Female",
    "Other"
  ];

  countries = [
    new Country('UY', 'Uruguay'),
    new Country('US', 'United States'),
    new Country('AR', 'Argentina')
  ];


  validation_messages = {
    'name': [
      { type: 'required', message: 'Full name is required' }
    ],
    'username': [
      { type: 'required', message: 'Full name is required' }
    ],
    'sexe': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'adresse': [
      { type: 'required', message: 'Full adress is required' }
    ],
    'ville': [
      { type: 'required', message: 'Full country is required' }
    ],
    'number': [
      { type: 'required', message: 'Phone is required' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ]
  };

  account_validation_messages = {

    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
  
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // country & phone validation
    let country = new FormControl(this.countries[0], Validators.required);

    let phone = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        PhoneValidator.validCountryPhone(country)
      ])
    });

    this.countryPhoneGroup = new FormGroup({
      country: country,
      phone: phone
    });

    // user details form validations
    this.userDetailsForm = this.fb.group({
      fullname: ['Homero Simpson', Validators.required ],
      bio: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", Validators.maxLength(256)],
      birthday: ['', Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
      countryPhone: this.countryPhoneGroup
    });


    // user links form validations
    this.accountDetailsForm = this.fb.group({
      username: new FormControl('', Validators.compose([
       UsernameValidator.validUsername,
       Validators.maxLength(25),
       Validators.minLength(5),
       Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
       Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matchingPasswords: this.matchingPasswordsGroup,
      terms: new FormControl(false, Validators.pattern('true'))
    })

  }

  onSubmitAccountDetails(value: any){
    console.log(value);
  }

  onSubmitUserDetails(value: any){
    console.log(value);
  }


  submit(){
    if(this.f.valid){
      Swal.fire("Votre travail a été bien enregistré", "Le rôle a bien ajouté"
      , 'success');
  
    } else {
      err => {
        Swal.fire("Quelque chose s'est mal passé", "Erreur d'ajout de rôle"
          , 'error');
      }
    }
  }
}
