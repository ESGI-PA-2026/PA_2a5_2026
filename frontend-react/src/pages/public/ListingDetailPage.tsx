import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listingService } from '../../services/api';
import PublicLayout from '../../components/layout/PublicLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { MapPin, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import clsx from 'clsx';

const conditionLabels: Record<string, string> = {
  neuf: 'Neuf',
  bon_etat: 'Bon état',
  use: 'Usé',
  pieces: 'Pour pièces',
};

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getOne(Number(id)),
    enabled: !!id,
  });

  const listing = data?.data;

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/annonces" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour aux annonces
        </Link>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : isError || !listing ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">Annonce introuvable</p>
            <Link to="/annonces" className="btn-primary mt-4 inline-block">Voir les annonces</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image + badges */}
            <div className="lg:col-span-2">
              <div className="h-72 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl relative overflow-hidden mb-6 flex items-center justify-center">
                <span className="text-white/20 text-9xl font-bold">
                  {listing.title?.charAt(0)?.toUpperCase() || '?'}
                </span>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={clsx('badge text-sm font-semibold', listing.type === 'don' ? 'bg-green-500 text-white' : 'bg-coral-500 text-white')}>
                    {listing.type === 'don' ? 'Don' : 'Vente'}
                  </span>
                  {listing.condition && (
                    <span className="badge bg-white/90 text-gray-700 text-sm">
                      {conditionLabels[listing.condition] || listing.condition}
                    </span>
                  )}
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-3">{listing.title}</h1>
              <p className="text-gray-600 leading-relaxed">{listing.description}</p>

              <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-500">
                {listing.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {listing.location}
                  </span>
                )}
                {listing.category && (
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {listing.category.name}
                  </span>
                )}
                {listing.created_at && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {format(new Date(listing.created_at), 'dd MMMM yyyy', { locale: fr })}
                  </span>
                )}
              </div>
            </div>

            {/* Sidebar prix + vendeur */}
            <div className="space-y-4">
              <div className="card">
                <div className="text-center">
                  {listing.type === 'vente' && listing.price ? (
                    <span className="text-3xl font-bold text-primary-500">{listing.price}€</span>
                  ) : (
                    <span className="text-3xl font-bold text-green-600">Gratuit</span>
                  )}
                </div>
              </div>

              {listing.user && (
                <div className="card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{listing.user.firstname} {listing.user.lastname}</p>
                      <p className="text-xs text-gray-500 capitalize">{listing.user.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
