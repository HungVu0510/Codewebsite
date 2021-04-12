/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Directive, ElementRef, HostBinding, Injector, Input, ViewContainerRef } from '@angular/core';
import { TourState } from 'ngx-tour-core';
import withinviewport from 'withinviewport';
import { TourAnchorOpenerComponent } from './tour-anchor-opener.component';
import { TourStepTemplateService } from './tour-step-template.service';
import { first } from 'rxjs/operators';
import { TourBackdropService } from './tour-backdrop.service';
import { NgxmTourService } from './ngx-md-menu-tour.service';
var TourAnchorMatMenuDirective = /** @class */ (function () {
    function TourAnchorMatMenuDirective(componentFactoryResolver, injector, viewContainer, element, tourService, tourStepTemplate, tourBackdrop) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.viewContainer = viewContainer;
        this.element = element;
        this.tourService = tourService;
        this.tourStepTemplate = tourStepTemplate;
        this.tourBackdrop = tourBackdrop;
        this.opener = this.viewContainer.createComponent(this.componentFactoryResolver.resolveComponentFactory(TourAnchorOpenerComponent)).instance;
    }
    /**
     * @return {?}
     */
    TourAnchorMatMenuDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.tourService.register(this.tourAnchor, this);
    };
    /**
     * @return {?}
     */
    TourAnchorMatMenuDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.tourService.unregister(this.tourAnchor);
    };
    /**
     * @param {?} step
     * @return {?}
     */
    TourAnchorMatMenuDirective.prototype.showTourStep = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        var _this = this;
        this.isActive = true;
        this.tourStepTemplate.templateComponent.step = step;
        // Ignore step.placement
        if (!step.preventScrolling) {
            if (!withinviewport(this.element.nativeElement, { sides: 'bottom' })) {
                ((/** @type {?} */ (this.element.nativeElement))).scrollIntoView(false);
            }
            else if (!withinviewport(this.element.nativeElement, { sides: 'left top right' })) {
                ((/** @type {?} */ (this.element.nativeElement))).scrollIntoView(true);
            }
        }
        ((/** @type {?} */ (this.opener.trigger)))._element = this.element;
        this.opener.trigger.menu = this.tourStepTemplate.templateComponent.tourStep;
        this.opener.trigger.ngAfterContentInit();
        this.opener.trigger.openMenu();
        if (step.enableBackdrop) {
            this.tourBackdrop.show(this.element);
        }
        else {
            this.tourBackdrop.close();
        }
        step.prevBtnTitle = step.prevBtnTitle || 'Prev';
        step.nextBtnTitle = step.nextBtnTitle || 'Next';
        step.endBtnTitle = step.endBtnTitle || 'End';
        if (this.menuCloseSubscription) {
            this.menuCloseSubscription.unsubscribe();
        }
        this.menuCloseSubscription = this.opener.trigger.menuClosed
            .pipe(first())
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.tourService.getStatus() !== TourState.OFF) {
                _this.tourService.end();
            }
            _this.tourBackdrop.close();
        }));
    };
    /**
     * @return {?}
     */
    TourAnchorMatMenuDirective.prototype.hideTourStep = /**
     * @return {?}
     */
    function () {
        this.isActive = false;
        if (this.menuCloseSubscription) {
            this.menuCloseSubscription.unsubscribe();
        }
        this.opener.trigger.closeMenu();
        if (this.tourService.getStatus() === TourState.OFF) {
            this.tourBackdrop.close();
        }
    };
    TourAnchorMatMenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tourAnchor]'
                },] }
    ];
    /** @nocollapse */
    TourAnchorMatMenuDirective.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: NgxmTourService },
        { type: TourStepTemplateService },
        { type: TourBackdropService }
    ]; };
    TourAnchorMatMenuDirective.propDecorators = {
        tourAnchor: [{ type: Input }],
        isActive: [{ type: HostBinding, args: ['class.touranchor--is-active',] }]
    };
    return TourAnchorMatMenuDirective;
}());
export { TourAnchorMatMenuDirective };
if (false) {
    /** @type {?} */
    TourAnchorMatMenuDirective.prototype.tourAnchor;
    /** @type {?} */
    TourAnchorMatMenuDirective.prototype.opener;
    /** @type {?} */
    TourAnchorMatMenuDirective.prototype.menuCloseSubscription;
    /** @type {?} */
    TourAnchorMatMenuDirective.prototype.isActive;
    /**
     * @type {?}
     * @private
     */
    TourAnchorMatMenuDirective.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    TourAnchorMatMenuDirective.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    TourAnchorMatMenuDirective.prototype.viewContainer;
    /**
     * @type {?}
     * @private
     */
    TourAnchorMatMenuDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    TourAnchorMatMenuDirective.prototype.tourService;
    /**
     * @type {?}
     * @private
     */
    TourAnchorMatMenuDirective.prototype.tourStepTemplate;
    /**
     * @type {?}
     * @private
     */
    TourAnchorMatMenuDirective.prototype.tourBackdrop;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1hbmNob3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRvdXItbWQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi90b3VyLWFuY2hvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsUUFBUSxFQUNSLEtBQUssRUFHTCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLGNBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRTNEO0lBV0Usb0NBQ1Usd0JBQWtELEVBQ2xELFFBQWtCLEVBQ2xCLGFBQStCLEVBQy9CLE9BQW1CLEVBQ25CLFdBQTRCLEVBQzVCLGdCQUF5QyxFQUN6QyxZQUFpQztRQU5qQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBeUI7UUFDekMsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBRXpDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxl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QUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFTSxpREFBWTs7O0lBQW5CO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7O2dCQXJGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7O2dCQTFCQyx3QkFBd0I7Z0JBSXhCLFFBQVE7Z0JBSVIsZ0JBQWdCO2dCQU5oQixVQUFVO2dCQW9CSixlQUFlO2dCQUpkLHVCQUF1QjtnQkFFeEIsbUJBQW1COzs7NkJBU3hCLEtBQUs7MkJBSUwsV0FBVyxTQUFDLDZCQUE2Qjs7SUE2RTVDLGlDQUFDO0NBQUEsQUF0RkQsSUFzRkM7U0FuRlksMEJBQTBCOzs7SUFFckMsZ0RBQW1DOztJQUNuQyw0Q0FBeUM7O0lBQ3pDLDJEQUEyQzs7SUFFM0MsOENBQXFFOzs7OztJQUduRSw4REFBMEQ7Ozs7O0lBQzFELDhDQUEwQjs7Ozs7SUFDMUIsbURBQXVDOzs7OztJQUN2Qyw2Q0FBMkI7Ozs7O0lBQzNCLGlEQUFvQzs7Ozs7SUFDcEMsc0RBQWlEOzs7OztJQUNqRCxrREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBUb3VyQW5jaG9yRGlyZWN0aXZlLFxuICBUb3VyU3RhdGVcbn0gZnJvbSAnbmd4LXRvdXItY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB3aXRoaW52aWV3cG9ydCBmcm9tICd3aXRoaW52aWV3cG9ydCc7XG5cbmltcG9ydCB7IFRvdXJBbmNob3JPcGVuZXJDb21wb25lbnQgfSBmcm9tICcuL3RvdXItYW5jaG9yLW9wZW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG91clN0ZXBUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3RvdXItc3RlcC10ZW1wbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtUb3VyQmFja2Ryb3BTZXJ2aWNlfSBmcm9tICcuL3RvdXItYmFja2Ryb3Auc2VydmljZSc7XG5pbXBvcnQgeyBJTmd4bVN0ZXBPcHRpb24gYXMgSVN0ZXBPcHRpb24gfSBmcm9tICcuL3N0ZXAtb3B0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQge05neG1Ub3VyU2VydmljZX0gZnJvbSAnLi9uZ3gtbWQtbWVudS10b3VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdG91ckFuY2hvcl0nXG59KVxuZXhwb3J0IGNsYXNzIFRvdXJBbmNob3JNYXRNZW51RGlyZWN0aXZlXG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIFRvdXJBbmNob3JEaXJlY3RpdmUge1xuICBASW5wdXQoKSBwdWJsaWMgdG91ckFuY2hvcjogc3RyaW5nO1xuICBwdWJsaWMgb3BlbmVyOiBUb3VyQW5jaG9yT3BlbmVyQ29tcG9uZW50O1xuICBwdWJsaWMgbWVudUNsb3NlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50b3VyYW5jaG9yLS1pcy1hY3RpdmUnKSBwdWJsaWMgaXNBY3RpdmU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgdG91clNlcnZpY2U6IE5neG1Ub3VyU2VydmljZSxcbiAgICBwcml2YXRlIHRvdXJTdGVwVGVtcGxhdGU6IFRvdXJTdGVwVGVtcGxhdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG91ckJhY2tkcm9wOiBUb3VyQmFja2Ryb3BTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMub3BlbmVyID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgICBUb3VyQW5jaG9yT3BlbmVyQ29tcG9uZW50XG4gICAgICApXG4gICAgKS5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRvdXJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMudG91ckFuY2hvciwgdGhpcyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy50b3VyU2VydmljZS51bnJlZ2lzdGVyKHRoaXMudG91ckFuY2hvcik7XG4gIH1cblxuICBwdWJsaWMgc2hvd1RvdXJTdGVwKHN0ZXA6IElTdGVwT3B0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy50b3VyU3RlcFRlbXBsYXRlLnRlbXBsYXRlQ29tcG9uZW50LnN0ZXAgPSBzdGVwO1xuICAgIC8vIElnbm9yZSBzdGVwLnBsYWNlbWVudFxuICAgIGlmICghc3RlcC5wcmV2ZW50U2Nyb2xsaW5nKSB7XG4gICAgICBpZiAoIXdpdGhpbnZpZXdwb3J0KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCB7IHNpZGVzOiAnYm90dG9tJyB9KSkge1xuICAgICAgICAoPEhUTUxFbGVtZW50PnRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KS5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAhd2l0aGludmlld3BvcnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHsgc2lkZXM6ICdsZWZ0IHRvcCByaWdodCcgfSlcbiAgICAgICkge1xuICAgICAgICAoPEhUTUxFbGVtZW50PnRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KS5zY3JvbGxJbnRvVmlldyh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgKDxhbnk+dGhpcy5vcGVuZXIudHJpZ2dlcikuX2VsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgdGhpcy5vcGVuZXIudHJpZ2dlci5tZW51ID0gdGhpcy50b3VyU3RlcFRlbXBsYXRlLnRlbXBsYXRlQ29tcG9uZW50LnRvdXJTdGVwO1xuICAgIHRoaXMub3BlbmVyLnRyaWdnZXIubmdBZnRlckNvbnRlbnRJbml0KCk7XG4gICAgdGhpcy5vcGVuZXIudHJpZ2dlci5vcGVuTWVudSgpO1xuXG4gICAgaWYgKHN0ZXAuZW5hYmxlQmFja2Ryb3ApIHtcbiAgICAgIHRoaXMudG91ckJhY2tkcm9wLnNob3codGhpcy5lbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b3VyQmFja2Ryb3AuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBzdGVwLnByZXZCdG5UaXRsZSA9IHN0ZXAucHJldkJ0blRpdGxlIHx8ICdQcmV2JztcbiAgICBzdGVwLm5leHRCdG5UaXRsZSA9IHN0ZXAubmV4dEJ0blRpdGxlIHx8ICdOZXh0JztcbiAgICBzdGVwLmVuZEJ0blRpdGxlID0gc3RlcC5lbmRCdG5UaXRsZSB8fCAnRW5kJztcblxuICAgIGlmICh0aGlzLm1lbnVDbG9zZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5tZW51Q2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5tZW51Q2xvc2VTdWJzY3JpcHRpb24gPSB0aGlzLm9wZW5lci50cmlnZ2VyLm1lbnVDbG9zZWRcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudG91clNlcnZpY2UuZ2V0U3RhdHVzKCkgIT09IFRvdXJTdGF0ZS5PRkYpIHtcbiAgICAgICAgICB0aGlzLnRvdXJTZXJ2aWNlLmVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG91ckJhY2tkcm9wLmNsb3NlKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlVG91clN0ZXAoKTogdm9pZCB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm1lbnVDbG9zZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5tZW51Q2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5vcGVuZXIudHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICBpZiAodGhpcy50b3VyU2VydmljZS5nZXRTdGF0dXMoKSA9PT0gVG91clN0YXRlLk9GRikge1xuICAgICAgdGhpcy50b3VyQmFja2Ryb3AuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==