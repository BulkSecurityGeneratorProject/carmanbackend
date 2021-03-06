/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CarmanBackendTestModule } from '../../../test.module';
import { ImagesDialogComponent } from '../../../../../../main/webapp/app/entities/images/images-dialog.component';
import { ImagesService } from '../../../../../../main/webapp/app/entities/images/images.service';
import { Images } from '../../../../../../main/webapp/app/entities/images/images.model';
import { GalaryService } from '../../../../../../main/webapp/app/entities/galary';
import { ActivitiesService } from '../../../../../../main/webapp/app/entities/activities';
import { FacilitiesService } from '../../../../../../main/webapp/app/entities/facilities';

describe('Component Tests', () => {

    describe('Images Management Dialog Component', () => {
        let comp: ImagesDialogComponent;
        let fixture: ComponentFixture<ImagesDialogComponent>;
        let service: ImagesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CarmanBackendTestModule],
                declarations: [ImagesDialogComponent],
                providers: [
                    GalaryService,
                    ActivitiesService,
                    FacilitiesService,
                    ImagesService
                ]
            })
            .overrideTemplate(ImagesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImagesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImagesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Images(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.images = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'imagesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Images();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.images = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'imagesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
