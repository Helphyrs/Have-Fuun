import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './Component/Article/articles/articles.component';
import { ArticlesResolver } from './Services/Resolver/articles-resolver.service';
import { ArticleComponent } from './Component/Article/article/article.component';
import { FormComponent } from './Component/Forms/form/form.component';
import { FormsComponent } from './Component/Forms/forms/forms.component';
import { FormsResolverService } from './Services/Resolver/forms-resolver.service';
import { ProfilComponent } from './Component/profil/profil.component';
import { UsersResolverService } from './Services/Resolver/users-resolver.service';

const routes: Routes = [
  { path: "articles", component: ArticlesComponent, resolve: { articles: ArticlesResolver } },
  { path: "articles/:name", component: ArticleComponent, resolve: { articleInfo: ArticlesResolver } },
  { path: "forms", component: FormsComponent, resolve: { forms: FormsResolverService } },
  { path: "forms/:name", component: FormComponent, resolve: { form: FormsResolverService } },
  { path: "profil/:userId", component: ProfilComponent, resolve: { user: UsersResolverService } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
