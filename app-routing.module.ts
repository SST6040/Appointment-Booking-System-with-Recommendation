import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
  
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  
  {
    path: 'select-counsellor',
    loadChildren: () => import('./select-counsellor/select-counsellor.module').then( m => m.SelectCounsellorPageModule)
  },
  {
    path: 'select-datetime',
    loadChildren: () => import('./select-datetime/select-datetime.module').then( m => m.SelectDatetimePageModule)
  },
  {
    path: 'issue',
    loadChildren: () => import('./issue/issue.module').then( m => m.IssuePageModule)
  },
  {
    path: 'confirm-booking',
    loadChildren: () => import('./confirm-booking/confirm-booking.module').then( m => m.ConfirmBookingPageModule)
  },
  
  {
    path: 'editname',
    loadChildren: () => import('./editname/editname.module').then( m => m.EditnamePageModule)
  },
  
  {
    path: 'editgender',
    loadChildren: () => import('./editgender/editgender.module').then( m => m.EditgenderPageModule)
  },
  {
    path: 'editstudid',
    loadChildren: () => import('./editstudid/editstudid.module').then( m => m.EditstudidPageModule)
  },
  {
    path: 'editphone',
    loadChildren: () => import('./editphone/editphone.module').then( m => m.EditphonePageModule)
  },
  {
    path: 'editethn',
    loadChildren: () => import('./editethn/editethn.module').then( m => m.EditethnPageModule)
  },
  {
    path: 'editmethod',
    loadChildren: () => import('./editmethod/editmethod.module').then( m => m.EditmethodPageModule)
  },
  {
    path: 'editsession',
    loadChildren: () => import('./editsession/editsession.module').then( m => m.EditsessionPageModule)
  },
  {
    path: 'register-coun',
    loadChildren: () => import('./register-coun/register-coun.module').then( m => m.RegisterCounPageModule)
  },
  {
    path: 'coun-home',
    loadChildren: () => import('./coun-home/coun-home.module').then( m => m.CounHomePageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'coun-profile',
    loadChildren: () => import('./coun-profile/coun-profile.module').then( m => m.CounProfilePageModule)
  },
  {
    path: 'coun-editprofile',
    loadChildren: () => import('./coun-editprofile/coun-editprofile.module').then( m => m.CounEditprofilePageModule)
  },
  {
    path: 'editcnstaffid',
    loadChildren: () => import('./editcnstaffid/editcnstaffid.module').then( m => m.EditcnstaffidPageModule)
  },
  
  {
    path: 'editcngender',
    loadChildren: () => import('./editcngender/editcngender.module').then( m => m.EditcngenderPageModule)
  },
  {
    path: 'editcnethn',
    loadChildren: () => import('./editcnethn/editcnethn.module').then( m => m.EditcnethnPageModule)
  },
  {
    path: 'editcnname',
    loadChildren: () => import('./editcnname/editcnname.module').then( m => m.EditcnnamePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
