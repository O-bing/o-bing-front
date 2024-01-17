import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get static user image url', (done: DoneFn) => {
    service.getStaticUserPhoto().subscribe(res => {
      expect(res).toBe('https://firebasestorage.googleapis.com/v0/b/o-bing.appspot.com/o/Static%2FimgProfileRef.png?alt=media&token=d01422c8-b408-466b-b40a-87c912590d2b')
      done()
    }
    )
  })
});
