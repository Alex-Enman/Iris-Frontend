import {
  User,
  Building2,
  FileText,
  BarChart3,
  Package,
  Percent,
  TrendingUp,
  Repeat,
  MessageCircle,
  Mail,
  Phone,
  Store,
} from 'lucide-react';
import { Button } from '@components/ui/button';
import { Progress } from '@components/ui/progress';
import { Badge } from '@components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { useProfilePage } from '@hooks/user/use-profile-page';
import { RestaurantInfoCard } from './components/RestaurantInfoCard';
import { MetricsGrid } from './components/MetricsGrid';
import { TopSuppliersList } from './components/TopSuppliersList';
import { RecentActivity } from './components/RecentActivity';
import { SupplyAgreements } from './components/SupplyAgreements';
import { EditRestaurantProfileDialog } from './dialogs/edit-restaurant/EditRestaurantProfileDialog';
import { useLanguage } from '@contexts/LanguageContext';

interface ProfilePageProps {
  onViewSupplier?: (supplierId: string) => void;
}

export function ProfilePage({ onViewSupplier }: ProfilePageProps) {
  const { t } = useLanguage();
  const {
    activeTab,
    setActiveTab,
    isEditProfileOpen,
    setIsEditProfileOpen,
    restaurantProfile,
    restaurantInfo,
    metrics,
    topSuppliers,
    suppliersList,
    supplyAgreements,
    sustainabilityScore,
    handleSaveProfile,
    handleContactSupplier,
  } = useProfilePage();

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <div className='mb-8'>
          <h1 className='mb-2 text-4xl text-primary'>{t('profile')}</h1>
          <p className='text-muted-foreground'>
            {t('profileDescription')}
          </p>
        </div>

        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div className='sticky top-24 space-y-6'>
              <RestaurantInfoCard
                name={restaurantInfo.name}
                type={restaurantInfo.type}
                address={restaurantInfo.address}
                memberSince={restaurantInfo.memberSince}
                onEdit={() => setIsEditProfileOpen(true)}
              />

              <div className='rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
                <nav className='p-2'>
                  {[
                    { icon: User, label: t('myAccount'), value: 'account' },
                    {
                      icon: Package,
                      label: t('mySuppliers'),
                      value: 'suppliers',
                    },
                    { icon: FileText, label: t('invoicesLabel'), value: 'invoices' },
                    { icon: BarChart3, label: t('analyticsLabel'), value: 'analytics' },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(item.value as any)}
                      className={`duration-250 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                        activeTab === (item.value as any)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-primary/5'
                      }`}
                    >
                      <item.icon className='h-5 w-5' />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className='lg:col-span-2'>
            {activeTab === 'account' && (
              <div className='space-y-6'>
                <MetricsGrid metrics={metrics} />

                <div className='overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
                  <div className='mb-4 flex items-center justify-between'>
                    <div>
                      <h3 className='mb-1'>{t('sustainabilityScore')}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {t('basedOnSourcingPractices')}
                      </p>
                    </div>
                    <div className='text-4xl text-primary'>
                      {sustainabilityScore}
                      <span className='text-xl text-muted-foreground'>
                        /100
                      </span>
                    </div>
                  </div>
                  <Progress value={sustainabilityScore} className='h-3' />
                  <div className='mt-4 grid grid-cols-3 gap-4 text-sm'>
                    <div>
                      <div className='text-muted-foreground'>{t('local')}</div>
                      <div className='text-primary'>78%</div>
                    </div>
                    <div>
                      <div className='text-muted-foreground'>{t('organic')}</div>
                      <div className='text-primary'>65%</div>
                    </div>
                    <div>
                      <div className='text-muted-foreground'>{t('traceable')}</div>
                      <div className='text-primary'>92%</div>
                    </div>
                  </div>
                </div>

                <TopSuppliersList
                  suppliers={topSuppliers}
                  onViewSupplier={onViewSupplier}
                />

                <RecentActivity
                  items={[
                    {
                      action: t('orderDelivered'),
                      supplier: t('supplierNameGreenValleyFarm'),
                      time: `2 ${t('hoursAgo')}`,
                    },
                    {
                      action: t('invoicePaid'),
                      supplier: t('supplierNameMountainDairyCo'),
                      time: `1 ${t('dayAgo')}`,
                    },
                    {
                      action: t('newReviewPosted'),
                      supplier: t('supplierNameHeritageBakery'),
                      time: `3 ${t('daysAgo')}`,
                    },
                  ]}
                />
              </div>
            )}

            {activeTab === 'suppliers' && (
              <div className='space-y-6'>
                <Tabs defaultValue='all' className='w-full'>
                  <div className='mb-6 flex items-center justify-between'>
                    <div>
                      <h2 className='mb-1'>{t('mySuppliers')}</h2>
                      <p className='text-sm text-muted-foreground'>
                        {t('manageSuppliersDescription')}
                      </p>
                    </div>
                    <TabsList className='rounded-xl'>
                      <TabsTrigger value='all' className='rounded-lg'>
                        {t('allSuppliersLabel')}
                      </TabsTrigger>
                      <TabsTrigger value='agreements' className='rounded-lg'>
                        {t('contracts')}
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value='all' className='mt-0 space-y-4'>
                    {suppliersList.map((supplier, index) => (
                      <div
                        key={supplier.id}
                        className='duration-250 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
                        onClick={() => onViewSupplier?.(supplier.id.toString())}
                      >
                        <div className='p-6'>
                          <div className='flex items-start gap-4'>
                            <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl'>
                              <ImageWithFallback
                                src={supplier.image}
                                alt={supplier.name}
                                width={200}
                                height={200}
                                className='h-full w-full object-cover'
                              />
                            </div>
                            <div className='flex-1'>
                              <div className='mb-2 flex items-start justify-between'>
                                <div>
                                  <div className='mb-1 flex items-center gap-2'>
                                    <h3>{supplier.name}</h3>
                                    {supplier.hasContract && (
                                      <Badge
                                        variant='default'
                                        className='bg-primary'
                                      >
                                        <Repeat className='mr-1 h-3 w-3' />
                                        {t('contract')}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className='text-sm text-muted-foreground'>
                                    {supplier.category}
                                  </p>
                                </div>
                              </div>
                              <div className='mb-4 flex flex-wrap gap-4 text-sm'>
                                <div>
                                  <span className='text-muted-foreground'>
                                    {t('relationship')}: {' '}
                                  </span>
                                  <Badge variant='outline'>
                                    {supplier.relationship}
                                  </Badge>
                                </div>
                                <div>
                                  <span className='text-muted-foreground'>
                                    {t('totalOrders')}: {' '}
                                  </span>
                                  <span>{supplier.totalOrders}</span>
                                </div>
                                <div>
                                  <span className='text-muted-foreground'>
                                    {t('monthly')}: {' '}
                                  </span>
                                  <span className='text-primary'>
                                    {supplier.monthlySpend}
                                  </span>
                                </div>
                                <div>
                                  <span className='text-muted-foreground'>
                                    {t('lastOrder')}: {' '}
                                  </span>
                                  <span>{supplier.lastOrder}</span>
                                </div>
                              </div>
                              <div className='flex flex-wrap items-center gap-2 border-t border-border pt-4'>
                                <Button
                                  size='sm'
                                  className='rounded-xl'
                                  onClick={e => {
                                    e.stopPropagation();
                                    onViewSupplier?.(supplier.id.toString());
                                  }}
                                >
                                  <Store className='mr-2 h-4 w-4' />
                                  {t('visitStore')}
                                </Button>
                                <Button
                                  size='sm'
                                  variant='outline'
                                  className='rounded-xl'
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleContactSupplier(supplier.name);
                                  }}
                                >
                                  <MessageCircle className='mr-2 h-4 w-4' />
                                  {t('message')}
                                </Button>
                                <Button
                                  size='sm'
                                  variant='outline'
                                  className='rounded-xl'
                                  onClick={e => e.stopPropagation()}
                                >
                                  <Mail className='mr-2 h-4 w-4' />
                                  {t('emailAction')}
                                </Button>
                                <Button
                                  size='sm'
                                  variant='outline'
                                  className='rounded-xl'
                                  onClick={e => e.stopPropagation()}
                                >
                                  <Phone className='mr-2 h-4 w-4' />
                                  {t('callAction')}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value='agreements' className='mt-0 space-y-4'>
                    <SupplyAgreements agreements={supplyAgreements} />
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className='flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-12 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
                <div className='text-center'>
                  <FileText className='mx-auto mb-4 h-16 w-16 text-muted-foreground/30' />
                  <h3 className='mb-2 text-primary'>{t('invoicesLabel')}</h3>
                  <p className='text-muted-foreground'>
                    {t('invoiceManagementComingSoon')}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className='flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-12 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
                <div className='text-center'>
                  <BarChart3 className='mx-auto mb-4 h-16 w-16 text-muted-foreground/30' />
                  <h3 className='mb-2 text-primary'>{t('analyticsDashboard')}</h3>
                  <p className='text-muted-foreground'>
                    {t('analyticsComingSoon')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditRestaurantProfileDialog
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        restaurantProfile={restaurantProfile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
