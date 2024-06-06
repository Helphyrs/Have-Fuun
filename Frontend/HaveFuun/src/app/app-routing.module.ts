import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './Component/Article/articles/articles.component';
import { ArticlesResolver } from './Services/Resolver/articles-resolver.service';
import { ArticleComponent } from './Component/Article/article/article.component';
import { FormComponent } from './Component/Forms/form/form.component';
import { FormsComponent } from './Component/Forms/forms/forms.component';
import { FormsResolverService } from './Services/Resolver/forms-resolver.service';
import { ProfilComponent } from './Component/Profil/profil.component';
import { UsersResolverService } from './Services/Resolver/users-resolver.service';
import { HomeComponent } from './Component/Home/home.component';
import { AdminComponent } from './Component/Admin/admin/admin.component';
import { AdminCommentFromUserComponent } from './Component/Admin/admin-comment-from-user/admin-comment-from-user.component';
import { adminResolverResolver } from './Services/Resolver/Admin/admin-resolver.resolver';
import { adminGuardGuard } from './Services/Guard/admin-guard.guard';
import { userGuardGuard } from './Services/Guard/user-guard.guard';
import { AdminFormsComponent } from './Component/Admin/admin-forms/admin-forms.component';
import { AdminArticlesComponent } from './Component/Admin/admin-articles/admin-articles.component';
import { adminFormResolver } from './Services/Resolver/Admin/admin-form.resolver';
import { adminArticleResolver } from './Services/Resolver/Admin/admin-article.resolver';
import { ContactUsComponent } from './Component/Mandatory/contact-us/contact-us.component';
import { LegalNoticeComponent } from './Component/Mandatory/legal-notice/legal-notice.component';

const routes: Routes = [
  { path: "contact", component: ContactUsComponent },
  { path: "legal-notice", component: LegalNoticeComponent },
  { path: "articles", component: ArticlesComponent, resolve: { articles: ArticlesResolver } },
  { path: "articles/:name", component: ArticleComponent, resolve: { articleInfo: ArticlesResolver } },
  { path: "forms", component: FormsComponent, resolve: { forms: FormsResolverService } },
  { path: "forms/:name", component: FormComponent, resolve: { form: FormsResolverService } },
  { path: "profil", component: ProfilComponent, canActivate: [userGuardGuard], resolve: { user: UsersResolverService } },
  { path: "admin", component: AdminComponent, canActivate: [adminGuardGuard], resolve: { adminUsers: adminResolverResolver } },
  { path: "admin/user/:id", component: AdminCommentFromUserComponent, canActivate: [adminGuardGuard], resolve: { user: adminResolverResolver } },
  { path: "admin/forms", component: AdminFormsComponent, canActivate: [adminGuardGuard], resolve: { adminForms: adminFormResolver } },
  { path: "admin/articles", component: AdminArticlesComponent, canActivate: [adminGuardGuard], resolve: { adminArticles: adminArticleResolver } },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
