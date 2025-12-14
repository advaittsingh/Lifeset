import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2, Loader2, Brain } from 'lucide-react';
import { cmsApi } from '../../services/api/cms';
import { useToast } from '../../contexts/ToastContext';

export default function KnowYourselfPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['personality-questions'],
    queryFn: () => cmsApi.getPersonalityQuestions(),
  });

  const questions = Array.isArray(data) ? data : (data?.data || []);


  const deleteMutation = useMutation({
    mutationFn: (id: string) => cmsApi.deletePersonalityQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personality-questions'] });
      showToast('Question deleted successfully', 'success');
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Know Yourself Quiz</h1>
            <p className="text-slate-600 mt-1">Manage personality quiz questions</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600"
            onClick={() => navigate('/cms/know-yourself/create')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Question
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personality Quiz Questions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((item: any, idx: number) => (
                  <Card key={item.id} className="border-0 shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-slate-500">Question {item.order || idx + 1}</span>
                          </div>
                          <h3 className="font-semibold mb-2">{item.question}</h3>
                          <div className="ml-6 space-y-1">
                            {Array.isArray(item.options) && item.options.map((opt: string, optIdx: number) => (
                              <div key={optIdx} className="text-sm text-slate-600">
                                {optIdx + 1}. {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/cms/know-yourself/edit/${item.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMutation.mutate(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

