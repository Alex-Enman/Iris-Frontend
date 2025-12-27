'use client';

// Menu management form component for edit restaurant profile dialog

import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Label } from '@components/ui/label';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Plus, Trash2, Utensils } from 'lucide-react';
import {
  RestaurantProfile,
  MenuItem,
  MenuCategory,
} from '@/types/user/edit-restaurant/types';
import { useLanguage } from '@contexts/LanguageContext';

interface RestaurantMenuFormProps {
  profile: RestaurantProfile;
  onAddMenuCategory: () => void;
  onUpdateMenuCategory: (index: number, updates: Partial<MenuCategory>) => void;
  onRemoveMenuCategory: (index: number) => void;
  onAddMenuItem: (categoryIndex: number) => void;
  onUpdateMenuItem: (
    categoryIndex: number,
    itemIndex: number,
    updates: Partial<MenuItem>
  ) => void;
  onRemoveMenuItem: (categoryIndex: number, itemIndex: number) => void;
}

export function RestaurantMenuForm({
  profile,
  onAddMenuCategory,
  onUpdateMenuCategory,
  onRemoveMenuCategory,
  onAddMenuItem,
  onUpdateMenuItem,
  onRemoveMenuItem,
}: RestaurantMenuFormProps) {
  const { t } = useLanguage();
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>{t('menuCategories')}</h3>
        <Button onClick={onAddMenuCategory}>
          <Plus className='mr-2 h-4 w-4' />
          {t('addCategory')}
        </Button>
      </div>

      {profile.menu.length === 0 ? (
        <Card className='p-8 text-center'>
          <Utensils className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
          <h3 className='mb-2 text-lg font-semibold'>{t('noMenuCategoriesYet')}</h3>
          <p className='mb-4 text-muted-foreground'>
            {t('addYourFirstMenuCategoryToGetStarted')}
          </p>
          <Button onClick={onAddMenuCategory}>
            <Plus className='mr-2 h-4 w-4' />
            {t('addCategory')}
          </Button>
        </Card>
      ) : (
        <div className='space-y-4'>
          {profile.menu.map((category, categoryIndex) => (
            <Card key={categoryIndex} className='p-4'>
              <div className='mb-4 flex items-center justify-between'>
                <div className='flex-1'>
                  <Label htmlFor={`category-${categoryIndex}`}>
                    {t('categoryName')}
                  </Label>
                  <Input
                    id={`category-${categoryIndex}`}
                    value={category.category}
                    onChange={e =>
                      onUpdateMenuCategory(categoryIndex, {
                        category: e.target.value,
                      })
                    }
                    placeholder={t('enterCategoryName')}
                  />
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => onRemoveMenuCategory(categoryIndex)}
                  className='ml-2'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <h4 className='font-medium'>{t('menuItems')}</h4>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => onAddMenuItem(categoryIndex)}
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    {t('addItem')}
                  </Button>
                </div>

                {category.items.length === 0 ? (
                  <div className='py-4 text-center text-muted-foreground'>
                    {t('noItemsInThisCategoryYet')}
                  </div>
                ) : (
                  <div className='space-y-3'>
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className='grid grid-cols-1 gap-3 rounded-lg border p-3 md:grid-cols-2'
                      >
                        <div>
                          <Label
                            htmlFor={`item-name-${categoryIndex}-${itemIndex}`}
                          >
                            {t('itemName')}
                          </Label>
                          <Input
                            id={`item-name-${categoryIndex}-${itemIndex}`}
                            value={item.name}
                            onChange={e =>
                              onUpdateMenuItem(categoryIndex, itemIndex, {
                                name: e.target.value,
                              })
                            }
                            placeholder={t('enterItemName')}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`item-price-${categoryIndex}-${itemIndex}`}
                          >
                            {t('price')}
                          </Label>
                          <Input
                            id={`item-price-${categoryIndex}-${itemIndex}`}
                            value={item.price}
                            onChange={e =>
                              onUpdateMenuItem(categoryIndex, itemIndex, {
                                price: e.target.value,
                              })
                            }
                            placeholder={t('enterPrice')}
                          />
                        </div>
                        <div className='md:col-span-2'>
                          <Label
                            htmlFor={`item-description-${categoryIndex}-${itemIndex}`}
                          >
                            {t('storeDescription')}
                          </Label>
                          <Textarea
                            id={`item-description-${categoryIndex}-${itemIndex}`}
                            value={item.description}
                            onChange={e =>
                              onUpdateMenuItem(categoryIndex, itemIndex, {
                                description: e.target.value,
                              })
                            }
                            placeholder={t('enterItemDescription')}
                            rows={2}
                          />
                        </div>
                        <div className='md:col-span-2'>
                          <Label
                            htmlFor={`item-image-${categoryIndex}-${itemIndex}`}
                          >
                            {t('imageUrl')}
                          </Label>
                          <div className='flex space-x-2'>
                            <Input
                              id={`item-image-${categoryIndex}-${itemIndex}`}
                              value={item.image}
                              onChange={e =>
                                onUpdateMenuItem(categoryIndex, itemIndex, {
                                  image: e.target.value,
                                })
                              }
                              placeholder={t('enterImageUrl')}
                              className='flex-1'
                            />
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() =>
                                onRemoveMenuItem(categoryIndex, itemIndex)
                              }
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
