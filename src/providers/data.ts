import {BaseRecord, DataProvider, GetListParams, GetListResponse} from "@refinedev/core";
import {Subject} from "../types";

const mockSubjects: Subject[] = [
    {
        id: 1,
        name: "Introduction to Computer Science",
        code: "CS101",
        description: "An introduction to the fundamental concepts of computer science and programming.",
        department: "CS",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        name: "Calculus II",
        code: "MATH201",
        description: "Advanced topics in calculus including integration techniques, sequences, and series.",
        department: "Math",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        name: "Creative Writing",
        code: "ENG102",
        description: "A course focused on developing creative writing skills in various genres including fiction and poetry.",
        department: "English",
        createdAt: new Date().toISOString(),
    },
];

export const dataProvider: DataProvider = {
  getList: async<TData extends BaseRecord = BaseRecord>({resource, filters}: GetListParams):
      Promise<GetListResponse<TData>> => {
        if(resource !== 'subjects') {
          return {data: [] as TData[], total: 0};
        }

        let data = [...mockSubjects];

        if (filters) {
            filters.forEach((filter) => {
                if ('field' in filter && 'value' in filter && 'operator' in filter) {
                    const { field, value, operator } = filter;
                    if (field === 'department' && operator === 'eq') {
                        data = data.filter(s => s.department === value);
                    }
                    if (field === 'name' && operator === 'contains') {
                        data = data.filter(s => s.name.toLowerCase().includes((value as string).toLowerCase()));
                    }
                }
            });
        }

        return{
          data: data as unknown as TData[],
          total: data.length,
        }
  },

  getOne: async ({resource, id}) => {
      if (resource !== 'subjects') {
          throw new Error('Not found');
      }

      const subject = mockSubjects.find(s => s.id === Number(id));

      if (!subject) {
          throw new Error('Not found');
      }

      return {
          data: subject as any
      };
  },
  create: async () => {throw new Error('This function is not present in mock')},
  update: async () => {throw new Error('This function is not present in mock')},
  deleteOne: async () => {throw new Error('This function is not present in mock')},

  getApiUrl: () => '',

}